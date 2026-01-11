const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  // Site Settings
  site: {
    name: {
      type: String,
      required: [true, 'Site name is required'],
      trim: true,
      default: 'Wolverines Fitness Studio'
    },
    tagline: {
      type: String,
      trim: true,
      default: 'Transform your body, transform your life'
    },
    description: {
      type: String,
      trim: true,
      default: 'Transform your body and mind at our premium fitness studio'
    },
    keywords: [{
      type: String,
      trim: true
    }],
    logo: {
      url: String,
      alt: String,
      publicId: String
    },
    favicon: {
      url: String,
      publicId: String
    }
  },
  
  // Theme Settings
  theme: {
    primaryColor: {
      type: String,
      default: '#EAA620'
    },
    secondaryColor: {
      type: String,
      default: '#F3CE4D'
    },
    darkColor: {
      type: String,
      default: '#000000'
    },
    lightColor: {
      type: String,
      default: '#FCF8F8'
    },
    fontPrimary: {
      type: String,
      default: 'Oswald'
    },
    fontSecondary: {
      type: String,
      default: 'Open Sans'
    }
  },
  
  // SEO Settings
  seo: {
    metaTitle: {
      type: String,
      trim: true,
      default: 'Fitness Studio - Transform Your Body'
    },
    metaDescription: {
      type: String,
      trim: true,
      default: 'Transform your body and mind at our premium fitness studio'
    },
    ogImage: {
      url: String,
      alt: String,
      publicId: String
    },
    googleAnalyticsId: String,
    facebookPixelId: String
  },
  
  // Email Settings
  email: {
    fromName: {
      type: String,
      default: 'Wolverines Fitness Studio'
    },
    fromEmail: {
      type: String,
      default: 'noreply@wolverinesfitness.com'
    },
    replyToEmail: {
      type: String,
      default: 'info@wolverinesfitness.com'
    },
    smtpHost: String,
    smtpPort: Number,
    smtpUser: String,
    smtpPassword: String
  },
  
  // Business Settings
  business: {
    established: {
      type: Number,
      default: 2019
    },
    licenseNumber: String,
    taxId: String,
    insuranceProvider: String,
    certifications: [{
      name: String,
      number: String,
      expiryDate: Date
    }]
  },
  
  // Feature Flags
  features: {
    onlineBooking: {
      type: Boolean,
      default: true
    },
    membershipSignup: {
      type: Boolean,
      default: true
    },
    classScheduling: {
      type: Boolean,
      default: true
    },
    paymentProcessing: {
      type: Boolean,
      default: false
    },
    liveChat: {
      type: Boolean,
      default: true
    },
    newsletter: {
      type: Boolean,
      default: true
    }
  },
  
  // Maintenance Mode
  maintenance: {
    enabled: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: 'We are currently performing maintenance. Please check back soon!'
    },
    estimatedCompletion: Date
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Ensure only one settings document exists
settingsSchema.statics.getSiteSettings = async function() {
  let settings = await this.findOne({ isActive: true });
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('Settings', settingsSchema);