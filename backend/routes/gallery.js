const express = require('express');
const { body, validationResult } = require('express-validator');
const Gallery = require('../models/Gallery');
const { protect, editorOrAdmin } = require('../middleware/auth');
const { upload, handleMulterError, getFileUrl, deleteFile } = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/gallery
// @desc    Get all gallery items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, type, isFeatured, isActive, limit } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    else filter.isActive = true;

    let query = Gallery.find(filter).sort({ isFeatured: -1, order: 1, createdAt: -1 });
    
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const galleryItems = await query;
    
    res.json({
      success: true,
      count: galleryItems.length,
      data: galleryItems
    });
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching gallery items'
    });
  }
});

// @route   GET /api/gallery/:id
// @desc    Get single gallery item
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    // Increment views
    galleryItem.views += 1;
    await galleryItem.save();
    
    res.json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    console.error('Get gallery item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching gallery item'
    });
  }
});

// @route   POST /api/gallery
// @desc    Create new gallery item
// @access  Private (Editor/Admin)
router.post('/', [
  protect,
  editorOrAdmin,
  upload.fields([
    { name: 'media', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  handleMulterError,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('type').isIn(['image', 'video']).withMessage('Type must be image or video'),
    body('category').isIn(['equipment', 'training', 'facility', 'classes', 'events']).withMessage('Invalid category'),
    body('description').optional().isLength({ max: 200 }).withMessage('Description must be under 200 characters')
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

    const { title, type, category, description, tags, isActive, isFeatured, order } = req.body;
    
    // Handle media file
    let media = {};
    if (req.files && req.files.media && req.files.media[0]) {
      const mediaFile = req.files.media[0];
      media = {
        url: getFileUrl(req, mediaFile.path),
        alt: req.body.mediaAlt || title
      };
    } else if (req.body.mediaUrl) {
      media = {
        url: req.body.mediaUrl,
        alt: req.body.mediaAlt || title
      };
    }

    // Handle thumbnail (for videos)
    let thumbnail = {};
    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      const thumbnailFile = req.files.thumbnail[0];
      thumbnail = {
        url: getFileUrl(req, thumbnailFile.path),
        alt: req.body.thumbnailAlt || `${title} thumbnail`
      };
    } else if (req.body.thumbnailUrl) {
      thumbnail = {
        url: req.body.thumbnailUrl,
        alt: req.body.thumbnailAlt || `${title} thumbnail`
      };
    }

    const galleryData = {
      title,
      type,
      category,
      media,
      description,
      isActive: isActive !== undefined ? isActive : true,
      isFeatured: isFeatured !== undefined ? isFeatured : false,
      order: order || 0
    };

    if (type === 'video' && thumbnail.url) {
      galleryData.thumbnail = thumbnail;
    }

    if (tags) {
      galleryData.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    }

    const galleryItem = await Gallery.create(galleryData);
    
    res.status(201).json({
      success: true,
      message: 'Gallery item created successfully',
      data: galleryItem
    });
  } catch (error) {
    console.error('Create gallery item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating gallery item'
    });
  }
});

// @route   PUT /api/gallery/:id
// @desc    Update gallery item
// @access  Private (Editor/Admin)
router.put('/:id', [
  protect,
  editorOrAdmin,
  upload.fields([
    { name: 'media', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  handleMulterError,
  [
    body('type').optional().isIn(['image', 'video']).withMessage('Type must be image or video'),
    body('category').optional().isIn(['equipment', 'training', 'facility', 'classes', 'events']).withMessage('Invalid category'),
    body('description').optional().isLength({ max: 200 }).withMessage('Description must be under 200 characters')
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

    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    const { title, type, category, description, tags, isActive, isFeatured, order } = req.body;
    
    // Update fields
    if (title) galleryItem.title = title;
    if (type) galleryItem.type = type;
    if (category) galleryItem.category = category;
    if (description !== undefined) galleryItem.description = description;
    if (isActive !== undefined) galleryItem.isActive = isActive;
    if (isFeatured !== undefined) galleryItem.isFeatured = isFeatured;
    if (order !== undefined) galleryItem.order = order;

    // Handle media update
    if (req.files && req.files.media && req.files.media[0]) {
      // Delete old media if it's a local file
      if (galleryItem.media.url && galleryItem.media.url.includes('/uploads/')) {
        const oldPath = galleryItem.media.url.replace(`${req.protocol}://${req.get('host')}`, '.');
        deleteFile(oldPath);
      }
      
      const mediaFile = req.files.media[0];
      galleryItem.media = {
        url: getFileUrl(req, mediaFile.path),
        alt: req.body.mediaAlt || galleryItem.media.alt || galleryItem.title
      };
    } else if (req.body.mediaUrl) {
      galleryItem.media.url = req.body.mediaUrl;
      if (req.body.mediaAlt) {
        galleryItem.media.alt = req.body.mediaAlt;
      }
    }

    // Handle thumbnail update
    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      // Delete old thumbnail if it's a local file
      if (galleryItem.thumbnail && galleryItem.thumbnail.url && galleryItem.thumbnail.url.includes('/uploads/')) {
        const oldPath = galleryItem.thumbnail.url.replace(`${req.protocol}://${req.get('host')}`, '.');
        deleteFile(oldPath);
      }
      
      const thumbnailFile = req.files.thumbnail[0];
      galleryItem.thumbnail = {
        url: getFileUrl(req, thumbnailFile.path),
        alt: req.body.thumbnailAlt || `${galleryItem.title} thumbnail`
      };
    } else if (req.body.thumbnailUrl) {
      if (!galleryItem.thumbnail) galleryItem.thumbnail = {};
      galleryItem.thumbnail.url = req.body.thumbnailUrl;
      if (req.body.thumbnailAlt) {
        galleryItem.thumbnail.alt = req.body.thumbnailAlt;
      }
    }

    // Parse and update tags
    if (tags) {
      galleryItem.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    }

    await galleryItem.save();
    
    res.json({
      success: true,
      message: 'Gallery item updated successfully',
      data: galleryItem
    });
  } catch (error) {
    console.error('Update gallery item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating gallery item'
    });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery item
// @access  Private (Editor/Admin)
router.delete('/:id', protect, editorOrAdmin, async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    // Delete associated files if they're local files
    if (galleryItem.media.url && galleryItem.media.url.includes('/uploads/')) {
      const mediaPath = galleryItem.media.url.replace(`${req.protocol}://${req.get('host')}`, '.');
      deleteFile(mediaPath);
    }

    if (galleryItem.thumbnail && galleryItem.thumbnail.url && galleryItem.thumbnail.url.includes('/uploads/')) {
      const thumbnailPath = galleryItem.thumbnail.url.replace(`${req.protocol}://${req.get('host')}`, '.');
      deleteFile(thumbnailPath);
    }

    await Gallery.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting gallery item'
    });
  }
});

// @route   GET /api/gallery/categories/list
// @desc    Get all gallery categories
// @access  Public
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Gallery.distinct('category', { isActive: true });
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get gallery categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching gallery categories'
    });
  }
});

module.exports = router;