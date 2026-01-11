const express = require('express');
const { body, validationResult } = require('express-validator');
const Hero = require('../models/Hero');
const { protect, editorOrAdmin } = require('../middleware/auth');
const { upload, handleMulterError, getFileUrl, deleteFile } = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/hero
// @desc    Get all hero sections
// @access  Public
router.get('/', async (req, res) => {
  try {
    const heroes = await Hero.find({ isActive: true }).sort({ order: 1 });
    
    res.json({
      success: true,
      count: heroes.length,
      data: heroes
    });
  } catch (error) {
    console.error('Get heroes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching hero sections'
    });
  }
});

// @route   GET /api/hero/:id
// @desc    Get single hero section
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    
    if (!hero) {
      return res.status(404).json({
        success: false,
        message: 'Hero section not found'
      });
    }
    
    res.json({
      success: true,
      data: hero
    });
  } catch (error) {
    console.error('Get hero error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching hero section'
    });
  }
});

// @route   POST /api/hero
// @desc    Create new hero section
// @access  Private (Editor/Admin)
router.post('/', [
  protect,
  editorOrAdmin,
  upload.single('backgroundImage'),
  handleMulterError,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('subtitle').trim().notEmpty().withMessage('Subtitle is required'),
    body('buttons').optional().isArray().withMessage('Buttons must be an array'),
    body('stats').optional().isArray().withMessage('Stats must be an array')
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

    const { title, subtitle, buttons, stats, isActive, order } = req.body;
    
    // Handle background image
    let backgroundImage = {};
    if (req.file) {
      backgroundImage = {
        url: getFileUrl(req, req.file.path),
        alt: `${title} background image`
      };
    } else if (req.body.backgroundImageUrl) {
      backgroundImage = {
        url: req.body.backgroundImageUrl,
        alt: req.body.backgroundImageAlt || `${title} background image`
      };
    }

    const heroData = {
      title,
      subtitle,
      backgroundImage,
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0
    };

    // Parse JSON strings if they exist
    if (buttons) {
      heroData.buttons = typeof buttons === 'string' ? JSON.parse(buttons) : buttons;
    }
    
    if (stats) {
      heroData.stats = typeof stats === 'string' ? JSON.parse(stats) : stats;
    }

    const hero = await Hero.create(heroData);
    
    res.status(201).json({
      success: true,
      message: 'Hero section created successfully',
      data: hero
    });
  } catch (error) {
    console.error('Create hero error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating hero section'
    });
  }
});

// @route   PUT /api/hero/:id
// @desc    Update hero section
// @access  Private (Editor/Admin)
router.put('/:id', [
  protect,
  editorOrAdmin,
  upload.single('backgroundImage'),
  handleMulterError,
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('subtitle').optional().trim().notEmpty().withMessage('Subtitle cannot be empty')
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

    const hero = await Hero.findById(req.params.id);
    if (!hero) {
      return res.status(404).json({
        success: false,
        message: 'Hero section not found'
      });
    }

    const { title, subtitle, buttons, stats, isActive, order } = req.body;
    
    // Update fields
    if (title) hero.title = title;
    if (subtitle) hero.subtitle = subtitle;
    if (isActive !== undefined) hero.isActive = isActive;
    if (order !== undefined) hero.order = order;

    // Handle background image update
    if (req.file) {
      // Delete old image if it exists and is a local file
      if (hero.backgroundImage.url && hero.backgroundImage.url.includes('/uploads/')) {
        const oldPath = hero.backgroundImage.url.replace(`${req.protocol}://${req.get('host')}`, '.');
        deleteFile(oldPath);
      }
      
      hero.backgroundImage = {
        url: getFileUrl(req, req.file.path),
        alt: req.body.backgroundImageAlt || `${hero.title} background image`
      };
    } else if (req.body.backgroundImageUrl) {
      hero.backgroundImage.url = req.body.backgroundImageUrl;
      if (req.body.backgroundImageAlt) {
        hero.backgroundImage.alt = req.body.backgroundImageAlt;
      }
    }

    // Parse and update buttons and stats
    if (buttons) {
      hero.buttons = typeof buttons === 'string' ? JSON.parse(buttons) : buttons;
    }
    
    if (stats) {
      hero.stats = typeof stats === 'string' ? JSON.parse(stats) : stats;
    }

    await hero.save();
    
    res.json({
      success: true,
      message: 'Hero section updated successfully',
      data: hero
    });
  } catch (error) {
    console.error('Update hero error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating hero section'
    });
  }
});

// @route   DELETE /api/hero/:id
// @desc    Delete hero section
// @access  Private (Editor/Admin)
router.delete('/:id', protect, editorOrAdmin, async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    
    if (!hero) {
      return res.status(404).json({
        success: false,
        message: 'Hero section not found'
      });
    }

    // Delete associated image if it's a local file
    if (hero.backgroundImage.url && hero.backgroundImage.url.includes('/uploads/')) {
      const imagePath = hero.backgroundImage.url.replace(`${req.protocol}://${req.get('host')}`, '.');
      deleteFile(imagePath);
    }

    await Hero.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Hero section deleted successfully'
    });
  } catch (error) {
    console.error('Delete hero error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting hero section'
    });
  }
});

module.exports = router;