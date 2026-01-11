const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Gallery item title is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['equipment', 'training', 'facility', 'classes', 'events'],
    trim: true
  },
  media: {
    url: {
      type: String,
      required: [true, 'Media URL is required']
    },
    alt: {
      type: String,
      default: 'Gallery media'
    },
    publicId: String
  },
  thumbnail: {
    url: String,
    alt: String,
    publicId: String
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
gallerySchema.index({ category: 1, isActive: 1 });
gallerySchema.index({ isFeatured: 1, order: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);