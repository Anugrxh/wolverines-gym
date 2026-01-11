const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Training title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Training description is required'],
    trim: true
  },
  image: {
    url: {
      type: String,
      required: [true, 'Training image URL is required']
    },
    alt: {
      type: String,
      default: 'Training program image'
    },
    publicId: String
  },
  features: [{
    type: String,
    required: true,
    trim: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['weight-loss', 'muscle-building', 'functional-fitness', 'hiit-training', 'yoga', 'athletic-performance'],
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  price: {
    type: Number,
    min: 0
  },
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

module.exports = mongoose.model('Training', trainingSchema);