const express = require('express');
const { body, validationResult } = require('express-validator');
const Pricing = require('../models/Pricing');
const { protect, editorOrAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/pricing
// @desc    Get all pricing plans
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { isActive } = req.query;
    
    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    else filter.isActive = true;

    const pricingPlans = await Pricing.find(filter).sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: pricingPlans.length,
      data: pricingPlans
    });
  } catch (error) {
    console.error('Get pricing plans error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching pricing plans'
    });
  }
});

// @route   GET /api/pricing/:id
// @desc    Get single pricing plan
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const pricingPlan = await Pricing.findById(req.params.id);
    
    if (!pricingPlan) {
      return res.status(404).json({
        success: false,
        message: 'Pricing plan not found'
      });
    }
    
    res.json({
      success: true,
      data: pricingPlan
    });
  } catch (error) {
    console.error('Get pricing plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching pricing plan'
    });
  }
});

// @route   POST /api/pricing
// @desc    Create new pricing plan
// @access  Private (Editor/Admin)
router.post('/', [
  protect,
  editorOrAdmin,
  [
    body('name').trim().notEmpty().withMessage('Plan name is required'),
    body('price').isNumeric({ min: 0 }).withMessage('Price must be a positive number'),
    body('period').isIn(['month', 'year', 'week', 'day']).withMessage('Invalid billing period'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('features').isArray({ min: 1 }).withMessage('At least one feature is required'),
    body('buttonText').trim().notEmpty().withMessage('Button text is required'),
    body('maxMembers').optional().isInt({ min: 0 }).withMessage('Max members must be a positive integer'),
    body('trialDays').optional().isInt({ min: 0 }).withMessage('Trial days must be a positive integer')
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
      name, price, period, description, features, isPopular, buttonText, 
      color, maxMembers, trialDays, benefits, restrictions, isActive, order 
    } = req.body;

    const pricingData = {
      name,
      price: parseFloat(price),
      period,
      description,
      features: typeof features === 'string' ? JSON.parse(features) : features,
      isPopular: isPopular || false,
      buttonText,
      color: color || '#EAA620',
      maxMembers: maxMembers ? parseInt(maxMembers) : undefined,
      trialDays: trialDays ? parseInt(trialDays) : 7,
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0
    };

    // Parse JSON strings
    if (benefits) {
      pricingData.benefits = typeof benefits === 'string' ? JSON.parse(benefits) : benefits;
    }
    
    if (restrictions) {
      pricingData.restrictions = typeof restrictions === 'string' ? JSON.parse(restrictions) : restrictions;
    }

    const pricingPlan = await Pricing.create(pricingData);
    
    res.status(201).json({
      success: true,
      message: 'Pricing plan created successfully',
      data: pricingPlan
    });
  } catch (error) {
    console.error('Create pricing plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating pricing plan'
    });
  }
});

// @route   PUT /api/pricing/:id
// @desc    Update pricing plan
// @access  Private (Editor/Admin)
router.put('/:id', [
  protect,
  editorOrAdmin,
  [
    body('price').optional().isNumeric({ min: 0 }).withMessage('Price must be a positive number'),
    body('period').optional().isIn(['month', 'year', 'week', 'day']).withMessage('Invalid billing period'),
    body('maxMembers').optional().isInt({ min: 0 }).withMessage('Max members must be a positive integer'),
    body('trialDays').optional().isInt({ min: 0 }).withMessage('Trial days must be a positive integer')
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

    const pricingPlan = await Pricing.findById(req.params.id);
    if (!pricingPlan) {
      return res.status(404).json({
        success: false,
        message: 'Pricing plan not found'
      });
    }

    const { 
      name, price, period, description, features, isPopular, buttonText, 
      color, maxMembers, trialDays, benefits, restrictions, isActive, order 
    } = req.body;
    
    // Update fields
    if (name) pricingPlan.name = name;
    if (price !== undefined) pricingPlan.price = parseFloat(price);
    if (period) pricingPlan.period = period;
    if (description) pricingPlan.description = description;
    if (isPopular !== undefined) pricingPlan.isPopular = isPopular;
    if (buttonText) pricingPlan.buttonText = buttonText;
    if (color) pricingPlan.color = color;
    if (maxMembers !== undefined) pricingPlan.maxMembers = parseInt(maxMembers);
    if (trialDays !== undefined) pricingPlan.trialDays = parseInt(trialDays);
    if (isActive !== undefined) pricingPlan.isActive = isActive;
    if (order !== undefined) pricingPlan.order = order;

    // Parse and update arrays
    if (features) {
      pricingPlan.features = typeof features === 'string' ? JSON.parse(features) : features;
    }
    
    if (benefits) {
      pricingPlan.benefits = typeof benefits === 'string' ? JSON.parse(benefits) : benefits;
    }
    
    if (restrictions) {
      pricingPlan.restrictions = typeof restrictions === 'string' ? JSON.parse(restrictions) : restrictions;
    }

    await pricingPlan.save();
    
    res.json({
      success: true,
      message: 'Pricing plan updated successfully',
      data: pricingPlan
    });
  } catch (error) {
    console.error('Update pricing plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating pricing plan'
    });
  }
});

// @route   DELETE /api/pricing/:id
// @desc    Delete pricing plan
// @access  Private (Editor/Admin)
router.delete('/:id', protect, editorOrAdmin, async (req, res) => {
  try {
    const pricingPlan = await Pricing.findById(req.params.id);
    
    if (!pricingPlan) {
      return res.status(404).json({
        success: false,
        message: 'Pricing plan not found'
      });
    }

    await Pricing.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Pricing plan deleted successfully'
    });
  } catch (error) {
    console.error('Delete pricing plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting pricing plan'
    });
  }
});

module.exports = router;