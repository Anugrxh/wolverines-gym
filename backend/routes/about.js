const express = require('express');
const { body, validationResult } = require('express-validator');
const About = require('../models/About');
const { protect, editorOrAdmin } = require('../middleware/auth');
const { upload, handleMulterError, getFileUrl, deleteFile } = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/about
// @desc    Get about section
// @access  Public
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne({ isActive: true });
    
    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About section not found'
      });
    }
    
    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    console.error('Get about error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching about section'
    });
  }
});

// @route   POST /api/about
// @desc    Create about section
// @access  Private (Editor/Admin)
router.post('/', [
  protect,
  editorOrAdmin,
  upload.single('image'),
  handleMulterError,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('subtitle').trim().notEmpty().withMessage('Subtitle is required'),
    body('description').isArray({ min: 1 }).withMessage('At least one description paragraph is required'),
    body('features').isArray({ min: 1 }).withMessage('At least one feature is required')
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

    // Check if about section already exists
    const existingAbout = await About.findOne();
    if (existingAbout) {
      return res.status(400).json({
        success: false,
        message: 'About section already exists. Use PUT to update.'
      });
    }

    const { title, subtitle, description, features, overlayContent } = req.body;
    
    // Handle image
    let image = {};
    if (req.file) {
      image = {
        url: getFileUrl(req, req.file.path),
        alt: req.body.imageAlt || 'About us image'
      };
    } else if (req.body.imageUrl) {
      image = {
        url: req.body.imageUrl,
        alt: req.body.imageAlt || 'About us image'
      };
    }

    const aboutData = {
      title,
      subtitle,
      description: typeof description === 'string' ? JSON.parse(description) : description,
      image,
      features: typeof features === 'string' ? JSON.parse(features) : features,
      overlayContent: typeof overlayContent === 'string' ? JSON.parse(overlayContent) : overlayContent,
      isActive: true
    };

    const about = await About.create(aboutData);
    
    res.status(201).json({
      success: true,
      message: 'About section created successfully',
      data: about
    });
  } catch (error) {
    console.error('Create about error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating about section'
    });
  }
});

// @route   PUT /api/about/:id
// @desc    Update about section
// @access  Private (Editor/Admin)
router.put('/:id', [
  protect,
  editorOrAdmin,
  upload.single('image'),
  handleMulterError
], async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About section not found'
      });
    }

    const { title, subtitle, description, features, overlayContent, isActive } = req.body;
    
    // Update fields
    if (title) about.title = title;
    if (subtitle) about.subtitle = subtitle;
    if (isActive !== undefined) about.isActive = isActive;

    // Handle image update
    if (req.file) {
      // Delete old image if it exists and is a local file
      if (about.image.url && about.image.url.includes('/uploads/')) {
        const oldPath = about.image.url.replace(`${req.protocol}://${req.get('host')}`, '.');
        deleteFile(oldPath);
      }
      
      about.image = {
        url: getFileUrl(req, req.file.path),
        alt: req.body.imageAlt || about.image.alt || 'About us image'
      };
    } else if (req.body.imageUrl) {
      about.image.url = req.body.imageUrl;
      if (req.body.imageAlt) {
        about.image.alt = req.body.imageAlt;
      }
    }

    // Parse and update arrays
    if (description) {
      about.description = typeof description === 'string' ? JSON.parse(description) : description;
    }
    
    if (features) {
      about.features = typeof features === 'string' ? JSON.parse(features) : features;
    }

    if (overlayContent) {
      about.overlayContent = typeof overlayContent === 'string' ? JSON.parse(overlayContent) : overlayContent;
    }

    await about.save();
    
    res.json({
      success: true,
      message: 'About section updated successfully',
      data: about
    });
  } catch (error) {
    console.error('Update about error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating about section'
    });
  }
});

// @route   DELETE /api/about/:id
// @desc    Delete about section
// @access  Private (Editor/Admin)
router.delete('/:id', protect, editorOrAdmin, async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    
    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About section not found'
      });
    }

    // Delete associated image if it's a local file
    if (about.image.url && about.image.url.includes('/uploads/')) {
      const imagePath = about.image.url.replace(`${req.protocol}://${req.get('host')}`, '.');
      deleteFile(imagePath);
    }

    await About.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'About section deleted successfully'
    });
  } catch (error) {
    console.error('Delete about error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting about section'
    });
  }
});

module.exports = router;