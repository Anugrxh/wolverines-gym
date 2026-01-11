const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plan name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  period: {
    type: String,
    required: [true, 'Billing period is required'],
    enum: ['month', 'year', 'week', 'day'],
    default: 'month'
  },
  description: {
    type: String,
    required: [true, 'Plan description is required'],
    trim: true
  },
  features: [{
    type: String,
    required: true,
    trim: true
  }],
  isPopular: {
    type: Boolean,
    default: false
  },
  buttonText: {
    type: String,
    required: [true, 'Button text is required'],
    trim: true
  },
  color: {
    type: String,
    default: '#EAA620'
  },
  maxMembers: {
    type: Number,
    min: 0
  },
  trialDays: {
    type: Number,
    default: 7,
    min: 0
  },
  benefits: [{
    category: String, // e.g., 'access', 'training', 'amenities'
    items: [String]
  }],
  restrictions: [{
    type: String,
    trim: true
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

// Ensure only one plan can be marked as popular at a time
pricingSchema.pre('save', async function(next) {
  if (this.isPopular && this.isModified('isPopular')) {
    await this.constructor.updateMany(
      { _id: { $ne: this._id } },
      { isPopular: false }
    );
  }
  next();
});

module.exports = mongoose.model('Pricing', pricingSchema);