const express = require('express');
const { body, validationResult } = require('express-validator');
const Training = require('../models/Training');
const { protect, editorOrAdmin } = require('../middleware/auth');
const { upload, handleMulterError, getFileUrl, deleteFile } = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/training
// @desc    Get all training programs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, isActive } = req.query;
    
    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    else filter.isActive = true; // Default to active only

    const trainings = await Training.find(filter).sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: trainings.length,
      data: trainings
    });
  } catch (error) {
    console.error('Get trainings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching training programs'
    });
  }
});

// @route   GET /api/training/:id
// @desc    Get single training program
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    
    if (!training) {
      return res.status(404).json({
        success: false,
        message: 'Training program not found'
      });
    }
    
    res.json({
      success: true,
      data: training
    });
  } catch (error) {
    console.error('Get training error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching training program'
    });
  }
});

// @route   POST /api/training
// @desc    Create new training program
// @access  Private (Editor/Admin)
router.post('/', [
  protect,
  editorOrAdmin,
  upload.single('image'),
  handleMulterError,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category').isIn(['weight-loss', 'muscle-building', 'functional-fitness', 'hiit-training', 'yoga', 'athletic-performance']).withMessage('Invalid category'),
    body('features').isArray({ min: 1 }).withMessage('At least one feature is required'),
    body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty level'),
    body('price').optional().isNumeric({ min: 0 }).withMessage('Price must be a positive number')
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

    const { title, description, category, features, duration, difficulty, price, isActive, order } = req.body;
    
    // Handle image
    let image = {};
    if (req.file) {
      image = {
        url: getFileUrl(req, req.file.path),
        alt: req.body.imageAlt || `${title} training program`
      };
    } else if (req.body.imageUrl) {
      image = {
        url: req.body.imageUrl,
        alt: req.body.imageAlt || `${title} training program`
      };
    }

    const trainingData = {
      title,
      description,
      category,
      image,
      features: typeof features === 'string' ? JSON.parse(features) : features,
      duration,
      difficulty: difficulty || 'beginner',
      price: price ? parseFloat(price) : undefined,
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0
    };

    const training = await Training.create(trainingData);
    
    res.status(201).json({
      success: true,
      message: 'Training program created successfully',
      data: training
    });
  } catch (error) {
    console.error('Create training error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating training program'
    });
  }
});

// @route   PUT /api/training/:id
// @desc    Update training program
// @access  Private (Editor/Admin)
router.put('/:id', [
  protect,
  editorOrAdmin,
  upload.single('image'),
  handleMulterError,
  [
    body('category').optional().isIn(['weight-loss', 'muscle-building', 'functional-fitness', 'hiit-training', 'yoga', 'athletic-performance']).withMessage('Invalid category'),
    body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty level'),
    body('price').optional().isNumeric({ min: 0 }).withMessage('Price must be a positive number')
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

    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({
        success: false,
        message: 'Training program not found'
      });
    }

    const { title, description, category, features, duration, difficulty, price, isActive, order } = req.body;
    
    // Update fields
    if (title) training.title = title;
    if (description) training.description = description;
    if (category) training.category = category;
    if (duration) training.duration = duration;
    if (difficulty) training.difficulty = difficulty;
    if (price !== undefined) training.price = parseFloat(price);
    if (isActive !== undefined) training.isActive = isActive;
    if (order !== undefined) training.order = order;

    // Handle image update
    if (req.file) {
      // Delete old image if it exists and is a local file
      if (training.image.url && training.image.url.includes('/uploads/')) {
        const oldPath = training.image.url.replace(`${req.protocol}://${req.get('host')}`, '.');
        deleteFile(oldPath);
      }
      
      training.image = {
        url: getFileUrl(req, req.file.path),
        alt: req.body.imageAlt || training.image.alt || `${training.title} training program`
      };
    } else if (req.body.imageUrl) {
      training.image.url = req.body.imageUrl;
      if (req.body.imageAlt) {
        training.image.alt = req.body.imageAlt;
      }
    }

    // Parse and update features
    if (features) {
      training.features = typeof features === 'string' ? JSON.parse(features) : features;
    }

    await training.save();
    
    res.json({
      success: true,
      message: 'Training program updated successfully',
      data: training
    });
  } catch (error) {
    console.error('Update training error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating training program'
    });
  }
});

// @route   DELETE /api/training/:id
// @desc    Delete training program
// @access  Private (Editor/Admin)
router.delete('/:id', protect, editorOrAdmin, async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    
    if (!training) {
      return res.status(404).json({
        success: false,
        message: 'Training program not found'
      });
    }

    // Delete associated image if it's a local file
    if (training.image.url && training.image.url.includes('/uploads/')) {
      const imagePath = training.image.url.replace(`${req.protocol}://${req.get('host')}`, '.');
      deleteFile(imagePath);
    }

    await Training.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Training program deleted successfully'
    });
  } catch (error) {
    console.error('Delete training error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting training program'
    });
  }
});

// @route   GET /api/training/categories/list
// @desc    Get all training categories
// @access  Public
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Training.distinct('category', { isActive: true });
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching categories'
    });
  }
});

module.exports = router;