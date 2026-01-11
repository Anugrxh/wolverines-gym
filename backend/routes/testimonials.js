const express = require('express');
const { body, validationResult } = require('express-validator');
const Testimonial = require('../models/Testimonial');
const { protect, editorOrAdmin } = require('../middleware/auth');
const { upload, handleMulterError, getFileUrl, deleteFile } = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { program, rating, isFeatured, isActive, limit } = req.query;
    
    const filter = {};
    if (program) filter.program = program;
    if (rating) filter.rating = { $gte: parseInt(rating) };
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    else filter.isActive = true;

    let query = Testimonial.find(filter).sort({ isFeatured: -1, order: 1, createdAt: -1 });
    
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const testimonials = await query;
    
    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching testimonials'
    });
  }
});

// @route   GET /api/testimonials/:id
// @desc    Get single testimonial
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    
    res.json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    console.error('Get testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching testimonial'
    });
  }
});

// @route   POST /api/testimonials
// @desc    Create new testimonial
// @access  Private (Editor/Admin)
router.post('/', [
  protect,
  editorOrAdmin,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'beforeImage', maxCount: 1 },
    { name: 'afterImage', maxCount: 1 }
  ]),
  handleMulterError,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('role').trim().notEmpty().withMessage('Role is required'),
    body('text').trim().notEmpty().isLength({ max: 500 }).withMessage('Testimonial text is required and must be under 500 characters'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('result').trim().notEmpty().withMessage('Result is required'),
    body('program').isIn(['weight-loss', 'muscle-building', 'functional-fitness', 'hiit-training', 'yoga', 'athletic-performance']).withMessage('Invalid program')
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

    const { name, role, text, rating, result, program, duration, isActive, isFeatured, order } = req.body;
    
    // Handle main image
    let image = {};
    if (req.files && req.files.image && req.files.image[0]) {
      const imageFile = req.files.image[0];
      image = {
        url: getFileUrl(req, imageFile.path),
        alt: req.body.imageAlt || `${name} photo`
      };
    } else if (req.body.imageUrl) {
      image = {
        url: req.body.imageUrl,
        alt: req.body.imageAlt || `${name} photo`
      };
    }

    const testimonialData = {
      name,
      role,
      text,
      rating: parseInt(rating),
      image,
      result,
      program,
      duration,
      isActive: isActive !== undefined ? isActive : true,
      isFeatured: isFeatured !== undefined ? isFeatured : false,
      order: order || 0
    };

    // Handle before/after images
    if (req.files && req.files.beforeImage && req.files.beforeImage[0]) {
      const beforeFile = req.files.beforeImage[0];
      testimonialData.beforeImage = {
        url: getFileUrl(req, beforeFile.path),
        alt: `${name} before photo`
      };
    } else if (req.body.beforeImageUrl) {
      testimonialData.beforeImage = {
        url: req.body.beforeImageUrl,
        alt: req.body.beforeImageAlt || `${name} before photo`
      };
    }

    if (req.files && req.files.afterImage && req.files.afterImage[0]) {
      const afterFile = req.files.afterImage[0];
      testimonialData.afterImage = {
        url: getFileUrl(req, afterFile.path),
        alt: `${name} after photo`
      };
    } else if (req.body.afterImageUrl) {
      testimonialData.afterImage = {
        url: req.body.afterImageUrl,
        alt: req.body.afterImageAlt || `${name} after photo`
      };
    }

    const testimonial = await Testimonial.create(testimonialData);
    
    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: testimonial
    });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating testimonial'
    });
  }
});

// @route   PUT /api/testimonials/:id
// @desc    Update testimonial
// @access  Private (Editor/Admin)
router.put('/:id', [
  protect,
  editorOrAdmin,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'beforeImage', maxCount: 1 },
    { name: 'afterImage', maxCount: 1 }
  ]),
  handleMulterError,
  [
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('text').optional().isLength({ max: 500 }).withMessage('Testimonial text must be under 500 characters'),
    body('program').optional().isIn(['weight-loss', 'muscle-building', 'functional-fitness', 'hiit-training', 'yoga', 'athletic-performance']).withMessage('Invalid program')
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

    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    const { name, role, text, rating, result, program, duration, isActive, isFeatured, order } = req.body;
    
    // Update fields
    if (name) testimonial.name = name;
    if (role) testimonial.role = role;
    if (text) testimonial.text = text;
    if (rating) testimonial.rating = parseInt(rating);
    if (result) testimonial.result = result;
    if (program) testimonial.program = program;
    if (duration) testimonial.duration = duration;
    if (isActive !== undefined) testimonial.isActive = isActive;
    if (isFeatured !== undefined) testimonial.isFeatured = isFeatured;
    if (order !== undefined) testimonial.order = order;

    // Handle image updates
    if (req.files && req.files.image && req.files.image[0]) {
      if (testimonial.image.url && testimonial.image.url.includes('/uploads/')) {
        const oldPath = testimonial.image.url.replace(`${req.protocol}://${req.get('host')}`, '.');
        deleteFile(oldPath);
      }
      
      const imageFile = req.files.image[0];
      testimonial.image = {
        url: getFileUrl(req, imageFile.path),
        alt: req.body.imageAlt || testimonial.image.alt || `${testimonial.name} photo`
      };
    } else if (req.body.imageUrl) {
      testimonial.image.url = req.body.imageUrl;
      if (req.body.imageAlt) {
        testimonial.image.alt = req.body.imageAlt;
      }
    }

    // Handle before image
    if (req.files && req.files.beforeImage && req.files.beforeImage[0]) {
      if (testimonial.beforeImage && testimonial.beforeImage.url && testimonial.beforeImage.url.includes('/uploads/')) {
        const oldPath = testimonial.beforeImage.url.replace(`${req.protocol}://${req.get('host')}`, '.');
        deleteFile(oldPath);
      }
      
      const beforeFile = req.files.beforeImage[0];
      testimonial.beforeImage = {
        url: getFileUrl(req, beforeFile.path),
        alt: req.body.beforeImageAlt || `${testimonial.name} before photo`
      };
    } else if (req.body.beforeImageUrl) {
      if (!testimonial.beforeImage) testimonial.beforeImage = {};
      testimonial.beforeImage.url = req.body.beforeImageUrl;
      if (req.body.beforeImageAlt) {
        testimonial.beforeImage.alt = req.body.beforeImageAlt;
      }
    }

    // Handle after image
    if (req.files && req.files.afterImage && req.files.afterImage[0]) {
      if (testimonial.afterImage && testimonial.afterImage.url && testimonial.afterImage.url.includes('/uploads/')) {
        const oldPath = testimonial.afterImage.url.replace(`${req.protocol}://${req.get('host')}`, '.');
        deleteFile(oldPath);
      }
      
      const afterFile = req.files.afterImage[0];
      testimonial.afterImage = {
        url: getFileUrl(req, afterFile.path),
        alt: req.body.afterImageAlt || `${testimonial.name} after photo`
      };
    } else if (req.body.afterImageUrl) {
      if (!testimonial.afterImage) testimonial.afterImage = {};
      testimonial.afterImage.url = req.body.afterImageUrl;
      if (req.body.afterImageAlt) {
        testimonial.afterImage.alt = req.body.afterImageAlt;
      }
    }

    await testimonial.save();
    
    res.json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial
    });
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating testimonial'
    });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial
// @access  Private (Editor/Admin)
router.delete('/:id', protect, editorOrAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    // Delete associated images if they're local files
    const imagesToDelete = [testimonial.image, testimonial.beforeImage, testimonial.afterImage];
    
    imagesToDelete.forEach(img => {
      if (img && img.url && img.url.includes('/uploads/')) {
        const imagePath = img.url.replace(`${req.protocol}://${req.get('host')}`, '.');
        deleteFile(imagePath);
      }
    });

    await Testimonial.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting testimonial'
    });
  }
});

module.exports = router;