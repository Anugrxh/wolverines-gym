const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Customer role/program is required'],
    trim: true
  },
  text: {
    type: String,
    required: [true, 'Testimonial text is required'],
    trim: true,
    maxlength: [500, 'Testimonial cannot exceed 500 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  image: {
    url: {
      type: String,
      required: [true, 'Customer image URL is required']
    },
    alt: {
      type: String,
      default: 'Customer photo'
    },
    publicId: String
  },
  result: {
    type: String,
    required: [true, 'Achievement result is required'],
    trim: true
  },
  program: {
    type: String,
    enum: ['weight-loss', 'muscle-building', 'functional-fitness', 'hiit-training', 'yoga', 'athletic-performance'],
    required: true
  },
  beforeImage: {
    url: String,
    alt: String,
    publicId: String
  },
  afterImage: {
    url: String,
    alt: String,
    publicId: String
  },
  duration: {
    type: String,
    trim: true // e.g., "6 months", "1 year"
  },
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
  }
}, {
  timestamps: true
});

// Index for better query performance
testimonialSchema.index({ isActive: 1, isFeatured: 1, order: 1 });
testimonialSchema.index({ program: 1, rating: -1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);