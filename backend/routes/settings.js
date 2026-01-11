const express = require('express');
const { body, validationResult } = require('express-validator');
const Settings = require('../models/Settings');
const { protect, adminOnly } = require('../middleware/auth');
const { upload, handleMulterError, getFileUrl, deleteFile } = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/settings
// @desc    Get site settings
// @access  Public (some fields) / Private (sensitive fields)
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.getSiteSettings();
    
    // Remove sensitive information for public access
    const publicSettings = {
      site: settings.site,
      theme: settings.theme,
      seo: {
        metaTitle: settings.seo.metaTitle,
        metaDescription: settings.seo.metaDescription,
        ogImage: settings.seo.ogImage
      },
      features: settings.features,
      maintenance: settings.maintenance
    };
    
    res.json({
      success: true,
      data: publicSettings
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching settings'
    });
  }
});

// @route   GET /api/settings/admin
// @desc    Get all settings (admin only)
// @access  Private (Admin only)
router.get('/admin', protect, adminOnly, async (req, res) => {
  try {
    const settings = await Settings.getSiteSettings();
    
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Get admin settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching admin settings'
    });
  }
});

// @route   PUT /api/settings
// @desc    Update site settings
// @access  Private (Admin only)
router.put('/', [
  protect,
  adminOnly,
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'favicon', maxCount: 1 },
    { name: 'ogImage', maxCount: 1 }
  ]),
  handleMulterError,
  [
    body('site.name').optional().trim().notEmpty().withMessage('Site name cannot be empty'),
    body('seo.metaTitle').optional().trim().notEmpty().withMessage('Meta title cannot be empty'),
    body('email.fromEmail').optional().isEmail().withMessage('Valid from email is required'),
    body('email.replyToEmail').optional().isEmail().withMessage('Valid reply-to email is required')
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

    const settings = await Settings.getSiteSettings();
    
    const { site, theme, seo, email, business, features, maintenance } = req.body;
    
    // Update site settings
    if (site) {
      const parsedSite = typeof site === 'string' ? JSON.parse(site) : site;
      settings.site = { ...settings.site, ...parsedSite };
    }

    // Handle file uploads
    if (req.files) {
      // Logo
      if (req.files.logo && req.files.logo[0]) {
        if (settings.site.logo && settings.site.logo.url && settings.site.logo.url.includes('/uploads/')) {
          const oldPath = settings.site.logo.url.replace(`${req.protocol}://${req.get('host')}`, '.');
          deleteFile(oldPath);
        }
        
        const logoFile = req.files.logo[0];
        settings.site.logo = {
          url: getFileUrl(req, logoFile.path),
          alt: req.body.logoAlt || `${settings.site.name} logo`
        };
      }

      // Favicon
      if (req.files.favicon && req.files.favicon[0]) {
        if (settings.site.favicon && settings.site.favicon.url && settings.site.favicon.url.includes('/uploads/')) {
          const oldPath = settings.site.favicon.url.replace(`${req.protocol}://${req.get('host')}`, '.');
          deleteFile(oldPath);
        }
        
        const faviconFile = req.files.favicon[0];
        settings.site.favicon = {
          url: getFileUrl(req, faviconFile.path)
        };
      }

      // OG Image
      if (req.files.ogImage && req.files.ogImage[0]) {
        if (settings.seo.ogImage && settings.seo.ogImage.url && settings.seo.ogImage.url.includes('/uploads/')) {
          const oldPath = settings.seo.ogImage.url.replace(`${req.protocol}://${req.get('host')}`, '.');
          deleteFile(oldPath);
        }
        
        const ogImageFile = req.files.ogImage[0];
        settings.seo.ogImage = {
          url: getFileUrl(req, ogImageFile.path),
          alt: req.body.ogImageAlt || `${settings.site.name} social media image`
        };
      }
    }

    // Update other settings
    if (theme) {
      settings.theme = typeof theme === 'string' ? JSON.parse(theme) : theme;
    }
    
    if (seo) {
      const parsedSeo = typeof seo === 'string' ? JSON.parse(seo) : seo;
      settings.seo = { ...settings.seo, ...parsedSeo };
    }
    
    if (email) {
      settings.email = typeof email === 'string' ? JSON.parse(email) : email;
    }
    
    if (business) {
      settings.business = typeof business === 'string' ? JSON.parse(business) : business;
    }
    
    if (features) {
      settings.features = typeof features === 'string' ? JSON.parse(features) : features;
    }
    
    if (maintenance) {
      settings.maintenance = typeof maintenance === 'string' ? JSON.parse(maintenance) : maintenance;
    }

    await settings.save();
    
    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating settings'
    });
  }
});

// @route   PUT /api/settings/theme
// @desc    Update theme settings only
// @access  Private (Admin only)
router.put('/theme', [
  protect,
  adminOnly,
  [
    body('primaryColor').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Primary color must be a valid hex color'),
    body('secondaryColor').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Secondary color must be a valid hex color'),
    body('darkColor').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Dark color must be a valid hex color'),
    body('lightColor').optional().matches(/^#[0-9A-F]{6}$/i).withMessage('Light color must be a valid hex color')
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

    const settings = await Settings.getSiteSettings();
    
    const { primaryColor, secondaryColor, darkColor, lightColor, fontPrimary, fontSecondary } = req.body;
    
    // Update theme colors
    if (primaryColor) settings.theme.primaryColor = primaryColor;
    if (secondaryColor) settings.theme.secondaryColor = secondaryColor;
    if (darkColor) settings.theme.darkColor = darkColor;
    if (lightColor) settings.theme.lightColor = lightColor;
    if (fontPrimary) settings.theme.fontPrimary = fontPrimary;
    if (fontSecondary) settings.theme.fontSecondary = fontSecondary;

    await settings.save();
    
    res.json({
      success: true,
      message: 'Theme settings updated successfully',
      data: settings.theme
    });
  } catch (error) {
    console.error('Update theme error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating theme settings'
    });
  }
});

// @route   PUT /api/settings/maintenance
// @desc    Toggle maintenance mode
// @access  Private (Admin only)
router.put('/maintenance', [
  protect,
  adminOnly,
  [
    body('enabled').isBoolean().withMessage('Enabled must be a boolean'),
    body('message').optional().trim().notEmpty().withMessage('Message cannot be empty'),
    body('estimatedCompletion').optional().isISO8601().withMessage('Estimated completion must be a valid date')
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

    const settings = await Settings.getSiteSettings();
    
    const { enabled, message, estimatedCompletion } = req.body;
    
    settings.maintenance.enabled = enabled;
    if (message) settings.maintenance.message = message;
    if (estimatedCompletion) settings.maintenance.estimatedCompletion = new Date(estimatedCompletion);

    await settings.save();
    
    res.json({
      success: true,
      message: `Maintenance mode ${enabled ? 'enabled' : 'disabled'} successfully`,
      data: settings.maintenance
    });
  } catch (error) {
    console.error('Update maintenance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating maintenance settings'
    });
  }
});

module.exports = router;