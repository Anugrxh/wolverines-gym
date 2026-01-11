const express = require('express');
const { body, validationResult } = require('express-validator');
const Trainer = require('../models/Trainer');
const { protect, editorOrAdmin } = require('../middleware/auth');
const { upload, handleMulterError, getFileUrl, deleteFile } = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/trainers
// @desc    Get all trainers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { isActive, specialty } = req.query;
    
    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    else filter.isActive = true;
    if (specialty) filter.specialty = new RegExp(specialty, 'i');

    const trainers = await Trainer.find(filter).sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: trainers.length,
      data: trainers
    });
  } catch (error) {
    console.error('Get trainers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching trainers'
    });
  }
});

// @route   GET /api/trainers/:id
// @desc    Get single trainer
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    
    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      });
    }
    
    res.json({
      success: true,
      data: trainer
    });
  } catch (error) {
    console.error('Get trainer error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching trainer'
    });
  }
});

// @route   POST /api/trainers
// @desc    Create new trainer
// @access  Private (Editor/Admin)
router.post('/', [
  protect,
  editorOrAdmin,
  upload.single('image'),
  handleMulterError,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('specialty').trim().notEmpty().withMessage('Specialty is required'),
    body('experience').trim().notEmpty().withMessage('Experience is required'),
    body('bio').trim().notEmpty().isLength({ max: 500 }).withMessage('Bio is required and must be under 500 characters'),
    body('certifications').isArray({ min: 1 }).withMessage('At least one certification is required'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5')
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { 
      name, specialty, experience, bio, certifications, socialLinks, 
      email, phone, availability, rating, isActive, order 
    } = req.body;
    
    // Handle image
    let image = {};
    if (req.file) {
      image = {
        url: getFileUrl(req, req.file.path),
        alt: req.body.imageAlt || `${name} trainer photo`
      };
    } else if (req.body.imageUrl) {
      image = {
        url: req.body.imageUrl,
        alt: req.body.imageAlt || `${name} trainer photo`
      };
    }

    const trainerData = {
      name,
      specialty,
      experience,
      bio,
      image,
      certifications: typeof certifications === 'string' ? JSON.parse(certifications) : certifications,
      email,
      phone,
      rating: rating ? parseFloat(rating) : 5,
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0
    };

    // Parse JSON strings
    if (socialLinks) {
      trainerData.socialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
    }
    
    if (availability) {
      trainerData.availability = typeof availability === 'string' ? JSON.parse(availability) : availability;
    }

    const trainer = await Trainer.create(trainerData);
    
    res.status(201).json({
      success: true,
      message: 'Trainer created successfully',
      data: trainer
    });
  } catch (error) {
    console.error('Create trainer error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating trainer'
    });
  }
});

// @route   PUT /api/trainers/:id
// @desc    Update trainer
// @access  Private (Editor/Admin)
router.put('/:id', [
  protect,
  editorOrAdmin,
  upload.single('image'),
  handleMulterError,
  [
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
    body('bio').optional().isLength({ max: 500 }).withMessage('Bio must be under 500 characters')
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      });
    }

    const { 
      name, specialty, experience, bio, certifications, socialLinks, 
      email, phone, availability, rating, isActive, order 
    } = req.body;
    
    // Update fields
    if (name) trainer.name = name;
    if (specialty) trainer.specialty = specialty;
    if (experience) trainer.experience = experience;
    if (bio) trainer.bio = bio;
    if (email) trainer.email = email;
    if (phone) trainer.phone = phone;
    if (rating !== undefined) trainer.rating = parseFloat(rating);
    if (isActive !== undefined) trainer.isActive = isActive;
    if (order !== undefined) trainer.order = order;

    // Handle image update
    if (req.file) {
      if (trainer.image.url && trainer.image.url.includes('/uploads/')) {
        const oldPath = trainer.image.url.replace(`${req.protocol}://${req.get('host')}`, '.');
        deleteFile(oldPath);
      }
      
      trainer.image = {
        url: getFileUrl(req, req.file.path),
        alt: req.body.imageAlt || trainer.image.alt || `${trainer.name} trainer photo`
      };
    } else if (req.body.imageUrl) {
      trainer.image.url = req.body.imageUrl;
      if (req.body.imageAlt) {
        trainer.image.alt = req.body.imageAlt;
      }
    }

    // Parse and update arrays/objects
    if (certifications) {
      trainer.certifications = typeof certifications === 'string' ? JSON.parse(certifications) : certifications;
    }
    
    if (socialLinks) {
      trainer.socialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
    }
    
    if (availability) {
      trainer.availability = typeof availability === 'string' ? JSON.parse(availability) : availability;
    }

    await trainer.save();
    
    res.json({
      success: true,
      message: 'Trainer updated successfully',
      data: trainer
    });
  } catch (error) {
    console.error('Update trainer error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating trainer'
    });
  }
});

// @route   DELETE /api/trainers/:id
// @desc    Delete trainer
// @access  Private (Editor/Admin)
router.delete('/:id', protect, editorOrAdmin, async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    
    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      });
    }

    // Delete associated image if it's a local file
    if (trainer.image.url && trainer.image.url.includes('/uploads/')) {
      const imagePath = trainer.image.url.replace(`${req.protocol}://${req.get('host')}`, '.');
      deleteFile(imagePath);
    }

    await Trainer.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Trainer deleted successfully'
    });
  } catch (error) {
    console.error('Delete trainer error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting trainer'
    });
  }
});

module.exports = router;