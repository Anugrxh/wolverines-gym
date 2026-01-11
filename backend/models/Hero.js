const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Hero title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  subtitle: {
    type: String,
    required: [true, 'Hero subtitle is required'],
    trim: true,
    maxlength: [300, 'Subtitle cannot exceed 300 characters']
  },
  backgroundImage: {
    url: {
      type: String,
      required: [true, 'Background image URL is required']
    },
    alt: {
      type: String,
      default: 'Hero background image'
    },
    publicId: String // For Cloudinary
  },
  buttons: [{
    text: {
      type: String,
      required: true,
      trim: true
    },
    link: {
      type: String,
      required: true
    },
    style: {
      type: String,
      enum: ['primary', 'outline'],
      default: 'primary'
    }
  }],
  stats: [{
    number: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    icon: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Hero', heroSchema);