const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'About title is required'],
    trim: true
  },
  subtitle: {
    type: String,
    required: [true, 'About subtitle is required'],
    trim: true
  },
  description: [{
    type: String,
    required: true,
    trim: true
  }],
  image: {
    url: {
      type: String,
      required: [true, 'About image URL is required']
    },
    alt: {
      type: String,
      default: 'About us image'
    },
    publicId: String
  },
  features: [{
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    }
  }],
  overlayContent: {
    title: {
      type: String,
      required: true,
      trim: true
    },
    subtitle: {
      type: String,
      required: true,
      trim: true
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('About', aboutSchema);