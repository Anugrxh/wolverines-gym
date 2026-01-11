const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  // Contact Information
  gym: {
    name: {
      type: String,
      required: [true, 'Gym name is required'],
      trim: true
    },
    tagline: {
      type: String,
      trim: true
    },
    logo: {
      url: String,
      alt: String,
      publicId: String
    }
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required'],
      trim: true
    },
    country: {
      type: String,
      default: 'USA',
      trim: true
    }
  },
  contact: {
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    website: {
      type: String,
      trim: true
    }
  },
  hours: {
    weekdays: {
      open: {
        type: String,
        required: true,
        default: '05:00'
      },
      close: {
        type: String,
        required: true,
        default: '23:00'
      }
    },
    weekends: {
      open: {
        type: String,
        required: true,
        default: '06:00'
      },
      close: {
        type: String,
        required: true,
        default: '22:00'
      }
    },
    specialNote: {
      type: String,
      trim: true,
      default: '24/7 Access for Premium & Elite Members'
    }
  },
  location: {
    coordinates: {
      latitude: {
        type: Number,
        required: true,
        default: 40.7127753
      },
      longitude: {
        type: Number,
        required: true,
        default: -74.0059413
      }
    },
    mapEmbedUrl: {
      type: String,
      trim: true
    }
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
    linkedin: String,
    tiktok: String
  },
  amenities: [{
    type: String,
    trim: true
  }],
  transportation: [{
    type: {
      type: String,
      enum: ['car', 'metro', 'bus', 'bike', 'walk']
    },
    icon: String,
    title: String,
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);