const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { protect, editorOrAdmin } = require('../middleware/auth');
const { upload, handleMulterError, getFileUrl, deleteFile } = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/contact
// @desc    Get contact information
// @access  Public
router.get('/', async (req, res) => {
  try {
    const contact = await Contact.findOne({ isActive: true });
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact information not found'
      });
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching contact information'
    });
  }
});

// @route   POST /api/contact
// @desc    Create contact information
// @access  Private (Editor/Admin)
router.post('/', [
  protect,
  editorOrAdmin,
  upload.single('logo'),
  handleMulterError,
  [
    body('gym.name').trim().notEmpty().withMessage('Gym name is required'),
    body('address.street').trim().notEmpty().withMessage('Street address is required'),
    body('address.city').trim().notEmpty().withMessage('City is required'),
    body('address.state').trim().notEmpty().withMessage('State is required'),
    body('address.zipCode').trim().notEmpty().withMessage('Zip code is required'),
    body('contact.phone').trim().notEmpty().withMessage('Phone number is required'),
    body('contact.email').isEmail().withMessage('Valid email is required'),
    body('location.coordinates.latitude').isFloat().withMessage('Valid latitude is required'),
    body('location.coordinates.longitude').isFloat().withMessage('Valid longitude is required')
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

    // Check if contact info already exists
    const existingContact = await Contact.findOne();
    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: 'Contact information already exists. Use PUT to update.'
      });
    }

    const { gym, address, contact, hours, location, socialMedia, amenities, transportation } = req.body;
    
    // Handle logo
    let logo = {};
    if (req.file) {
      logo = {
        url: getFileUrl(req, req.file.path),
        alt: req.body.logoAlt || `${gym.name} logo`
      };
    } else if (req.body.logoUrl) {
      logo = {
        url: req.body.logoUrl,
        alt: req.body.logoAlt || `${gym.name} logo`
      };
    }

    const contactData = {
      gym: {
        ...gym,
        logo
      },
      address: typeof address === 'string' ? JSON.parse(address) : address,
      contact: typeof contact === 'string' ? JSON.parse(contact) : contact,
      hours: typeof hours === 'string' ? JSON.parse(hours) : hours,
      location: typeof location === 'string' ? JSON.parse(location) : location,
      isActive: true
    };

    // Parse optional fields
    if (socialMedia) {
      contactData.socialMedia = typeof socialMedia === 'string' ? JSON.parse(socialMedia) : socialMedia;
    }
    
    if (amenities) {
      contactData.amenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities;
    }
    
    if (transportation) {
      contactData.transportation = typeof transportation === 'string' ? JSON.parse(transportation) : transportation;
    }

    const contactInfo = await Contact.create(contactData);
    
    res.status(201).json({
      success: true,
      message: 'Contact information created successfully',
      data: contactInfo
    });
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating contact information'
    });
  }
});

// @route   PUT /api/contact/:id
// @desc    Update contact information
// @access  Private (Editor/Admin)
router.put('/:id', [
  protect,
  editorOrAdmin,
  upload.single('logo'),
  handleMulterError,
  [
    body('contact.email').optional().isEmail().withMessage('Valid email is required'),
    body('location.coordinates.latitude').optional().isFloat().withMessage('Valid latitude is required'),
    body('location.coordinates.longitude').optional().isFloat().withMessage('Valid longitude is required')
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

    const contactInfo = await Contact.findById(req.params.id);
    if (!contactInfo) {
      return res.status(404).json({
        success: false,
        message: 'Contact information not found'
      });
    }

    const { gym, address, contact, hours, location, socialMedia, amenities, transportation, isActive } = req.body;
    
    // Update fields
    if (gym) {
      if (typeof gym === 'string') {
        const parsedGym = JSON.parse(gym);
        contactInfo.gym = { ...contactInfo.gym, ...parsedGym };
      } else {
        contactInfo.gym = { ...contactInfo.gym, ...gym };
      }
    }

    // Handle logo update
    if (req.file) {
      if (contactInfo.gym.logo && contactInfo.gym.logo.url && contactInfo.gym.logo.url.includes('/uploads/')) {
        const oldPath = contactInfo.gym.logo.url.replace(`${req.protocol}://${req.get('host')}`, '.');
        deleteFile(oldPath);
      }
      
      contactInfo.gym.logo = {
        url: getFileUrl(req, req.file.path),
        alt: req.body.logoAlt || contactInfo.gym.logo?.alt || `${contactInfo.gym.name} logo`
      };
    } else if (req.body.logoUrl) {
      if (!contactInfo.gym.logo) contactInfo.gym.logo = {};
      contactInfo.gym.logo.url = req.body.logoUrl;
      if (req.body.logoAlt) {
        contactInfo.gym.logo.alt = req.body.logoAlt;
      }
    }

    // Update other fields
    if (address) {
      contactInfo.address = typeof address === 'string' ? JSON.parse(address) : address;
    }
    
    if (contact) {
      contactInfo.contact = typeof contact === 'string' ? JSON.parse(contact) : contact;
    }
    
    if (hours) {
      contactInfo.hours = typeof hours === 'string' ? JSON.parse(hours) : hours;
    }
    
    if (location) {
      contactInfo.location = typeof location === 'string' ? JSON.parse(location) : location;
    }
    
    if (socialMedia) {
      contactInfo.socialMedia = typeof socialMedia === 'string' ? JSON.parse(socialMedia) : socialMedia;
    }
    
    if (amenities) {
      contactInfo.amenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities;
    }
    
    if (transportation) {
      contactInfo.transportation = typeof transportation === 'string' ? JSON.parse(transportation) : transportation;
    }

    if (isActive !== undefined) contactInfo.isActive = isActive;

    await contactInfo.save();
    
    res.json({
      success: true,
      message: 'Contact information updated successfully',
      data: contactInfo
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating contact information'
    });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact information
// @access  Private (Editor/Admin)
router.delete('/:id', protect, editorOrAdmin, async (req, res) => {
  try {
    const contactInfo = await Contact.findById(req.params.id);
    
    if (!contactInfo) {
      return res.status(404).json({
        success: false,
        message: 'Contact information not found'
      });
    }

    // Delete associated logo if it's a local file
    if (contactInfo.gym.logo && contactInfo.gym.logo.url && contactInfo.gym.logo.url.includes('/uploads/')) {
      const logoPath = contactInfo.gym.logo.url.replace(`${req.protocol}://${req.get('host')}`, '.');
      deleteFile(logoPath);
    }

    await Contact.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Contact information deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting contact information'
    });
  }
});

module.exports = router;