const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Hero = require('../models/Hero');
const About = require('../models/About');
const Training = require('../models/Training');
const Trainer = require('../models/Trainer');
const Gallery = require('../models/Gallery');
const Testimonial = require('../models/Testimonial');
const Pricing = require('../models/Pricing');
const Contact = require('../models/Contact');
const Settings = require('../models/Settings');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    console.log('🌱 Starting to seed database...');

    // Clear existing data
    await User.deleteMany({});
    await Hero.deleteMany({});
    await About.deleteMany({});
    await Training.deleteMany({});
    await Trainer.deleteMany({});
    await Gallery.deleteMany({});
    await Testimonial.deleteMany({});
    await Pricing.deleteMany({});
    await Contact.deleteMany({});
    await Settings.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@wolverinesfitness.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });

    console.log('👤 Created admin user');

    // Create hero section
    const hero = await Hero.create({
      title: 'TRANSFORM YOUR',
      subtitle: 'Unleash your potential with our world-class training programs, expert trainers, and state-of-the-art equipment.',
      backgroundImage: {
        url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        alt: 'Hero background image'
      },
      buttons: [
        {
          text: 'Start Your Journey',
          link: '#contact',
          style: 'primary'
        },
        {
          text: 'Learn More',
          link: '#about',
          style: 'outline'
        }
      ],
      stats: [
        { number: '1000+', label: 'Happy Members' },
        { number: '3+', label: 'Expert Trainers' },
        { number: '10+', label: 'Years Experience' },
        { number: '24/7', label: 'Gym Access' }
      ]
    });

    console.log('🦸 Created hero section');

    // Create about section
    const about = await About.create({
      title: 'About Our Gym',
      subtitle: "We're more than just a gym - we're your partners in achieving your fitness goals.",
      description: [
        "With over 5 years of experience in the fitness industry, we've helped hundreds of people transform their lives through fitness. Our state-of-the-art facility features the latest equipment and a team of certified trainers dedicated to your success.",
        "Whether you're a beginner taking your first steps into fitness or an experienced athlete looking to push your limits, we have the programs, equipment, and expertise to help you reach your goals."
      ],
      image: {
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        alt: 'Modern gym interior'
      },
      features: [
        {
          icon: '🏋️',
          title: 'Modern Equipment',
          description: 'Latest fitness technology and equipment for optimal results'
        },
        {
          icon: '👨‍💼',
          title: 'Expert Trainers',
          description: 'Certified professionals with years of experience'
        },
        {
          icon: '🕐',
          title: 'Flexible Hours',
          description: '24/7 access to fit your busy lifestyle'
        }
      ],
      overlayContent: {
        title: 'Join Our Community',
        subtitle: '500+ Members Strong'
      }
    });

    console.log('ℹ️  Created about section');

    // Create training programs
    const trainingPrograms = [
      {
        title: 'Weight Loss',
        description: 'Burn calories and shed pounds with our comprehensive weight loss programs combining cardio and strength training.',
        image: {
          url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          alt: 'Weight loss training'
        },
        features: ['Cardio Workouts', 'Nutrition Guidance', 'Progress Tracking', 'Personal Support'],
        category: 'weight-loss',
        difficulty: 'beginner',
        order: 1
      },
      {
        title: 'Muscle Building',
        description: 'Build lean muscle mass and increase strength with our specialized muscle building programs.',
        image: {
          url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          alt: 'Muscle building training'
        },
        features: ['Strength Training', 'Progressive Overload', 'Muscle Recovery', 'Supplement Advice'],
        category: 'muscle-building',
        difficulty: 'intermediate',
        order: 2
      },
      {
        title: 'Functional Fitness',
        description: 'Improve your daily movement patterns and overall functional strength for better quality of life.',
        image: {
          url: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          alt: 'Functional fitness training'
        },
        features: ['Movement Patterns', 'Core Stability', 'Balance Training', 'Injury Prevention'],
        category: 'functional-fitness',
        difficulty: 'beginner',
        order: 3
      }
    ];

    await Training.insertMany(trainingPrograms);
    console.log('🏃 Created training programs');

    // Create trainers
    const trainers = [
      {
        name: 'Mike Johnson',
        specialty: 'Strength & Conditioning',
        experience: '8 Years',
        image: {
          url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          alt: 'Mike Johnson trainer photo'
        },
        bio: 'Certified personal trainer specializing in strength training and muscle building.',
        certifications: ['NASM-CPT', 'CSCS', 'Nutrition Specialist'],
        rating: 5,
        order: 1
      },
      {
        name: 'Sarah Williams',
        specialty: 'Weight Loss & Cardio',
        experience: '6 Years',
        image: {
          url: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          alt: 'Sarah Williams trainer photo'
        },
        bio: 'Expert in weight loss programs and cardiovascular fitness training.',
        certifications: ['ACE-CPT', 'Weight Management', 'Group Fitness'],
        rating: 5,
        order: 2
      }
    ];

    await Trainer.insertMany(trainers);
    console.log('👨‍🏫 Created trainers');

    // Create testimonials
    const testimonials = [
      {
        name: 'Jessica Martinez',
        role: 'Weight Loss Success',
        image: {
          url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
          alt: 'Jessica Martinez photo'
        },
        text: 'I lost 30 pounds in 6 months! The trainers here are amazing and the community is so supportive. This gym changed my life completely.',
        rating: 5,
        result: 'Lost 30 lbs',
        program: 'weight-loss',
        duration: '6 months',
        order: 1
      },
      {
        name: 'Robert Johnson',
        role: 'Strength Training',
        image: {
          url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
          alt: 'Robert Johnson photo'
        },
        text: "The equipment is top-notch and the trainers really know their stuff. I've gained 15 pounds of muscle in just 4 months.",
        rating: 5,
        result: 'Gained 15 lbs muscle',
        program: 'muscle-building',
        duration: '4 months',
        order: 2
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log('💬 Created testimonials');

    // Create pricing plans
    const pricingPlans = [
      {
        name: 'Basic',
        price: 29,
        period: 'month',
        description: 'Perfect for beginners starting their fitness journey',
        features: [
          'Gym Access (6am - 10pm)',
          'Basic Equipment Usage',
          'Locker Room Access',
          'Free Fitness Assessment',
          'Mobile App Access',
          'Community Support'
        ],
        buttonText: 'Get Started',
        order: 1
      },
      {
        name: 'Premium',
        price: 59,
        period: 'month',
        isPopular: true,
        description: 'Most popular choice for serious fitness enthusiasts',
        features: [
          '24/7 Gym Access',
          'All Equipment & Classes',
          'Personal Training (2 sessions)',
          'Nutrition Consultation',
          'Guest Pass (2 per month)',
          'Premium Mobile Features',
          'Towel Service',
          'Free Parking'
        ],
        buttonText: 'Most Popular',
        order: 2
      },
      {
        name: 'Elite',
        price: 99,
        period: 'month',
        description: 'Ultimate package for maximum results and luxury',
        features: [
          '24/7 VIP Gym Access',
          'Unlimited Personal Training',
          'Custom Meal Plans',
          'Recovery & Spa Services',
          'Unlimited Guest Passes',
          'Priority Class Booking',
          'Dedicated Locker',
          'Concierge Service',
          'Supplement Discounts'
        ],
        buttonText: 'Go Elite',
        order: 3
      }
    ];

    await Pricing.insertMany(pricingPlans);
    console.log('💰 Created pricing plans');

    // Create contact information
    const contact = await Contact.create({
      gym: {
        name: 'Wolverines Fitness Studio',
        tagline: 'Transform your body, transform your life'
      },
      address: {
        street: '123 Fitness Street',
        city: 'Downtown',
        state: 'City',
        zipCode: '12345',
        country: 'USA'
      },
      contact: {
        phone: '(555) 123-4567',
        email: 'info@wolverinesfitness.com',
        website: 'https://wolverinesfitness.com'
      },
      hours: {
        weekdays: {
          open: '05:00',
          close: '23:00'
        },
        weekends: {
          open: '06:00',
          close: '22:00'
        },
        specialNote: '24/7 Access for Premium & Elite Members'
      },
      location: {
        coordinates: {
          latitude: 40.7127753,
          longitude: -74.0059413
        },
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus'
      },
      socialMedia: {
        facebook: 'https://facebook.com/wolverinesfitness',
        instagram: 'https://instagram.com/wolverinesfitness',
        twitter: 'https://twitter.com/wolverinesfitness'
      },
      amenities: [
        'Free Parking Available',
        'Public Transportation Nearby',
        'Wheelchair Accessible',
        'Changing Rooms & Showers',
        'Juice Bar & Supplements'
      ],
      transportation: [
        {
          type: 'car',
          icon: '🚗',
          title: 'By Car',
          description: 'Free parking available in our dedicated lot. Street parking also available.'
        },
        {
          type: 'metro',
          icon: '🚇',
          title: 'By Metro',
          description: 'Downtown Station is just 2 blocks away. Take the Red or Blue line.'
        },
        {
          type: 'bus',
          icon: '🚌',
          title: 'By Bus',
          description: 'Bus routes 15, 23, and 45 stop directly in front of our building.'
        }
      ]
    });

    console.log('📞 Created contact information');

    // Create settings
    const settings = await Settings.create({
      site: {
        name: 'Wolverines Fitness Studio',
        tagline: 'Transform your body, transform your life',
        description: 'Transform your body and mind at our premium fitness studio',
        keywords: ['fitness', 'gym', 'workout', 'training', 'health', 'wellness']
      },
      theme: {
        primaryColor: '#EAA620',
        secondaryColor: '#F3CE4D',
        darkColor: '#000000',
        lightColor: '#FCF8F8',
        fontPrimary: 'Oswald',
        fontSecondary: 'Open Sans'
      },
      seo: {
        metaTitle: 'Fitness Studio - Transform Your Body',
        metaDescription: 'Transform your body and mind at our premium fitness studio'
      },
      email: {
        fromName: 'Wolverines Fitness Studio',
        fromEmail: 'noreply@wolverinesfitness.com',
        replyToEmail: 'info@wolverinesfitness.com'
      },
      business: {
        established: 2019
      },
      features: {
        onlineBooking: true,
        membershipSignup: true,
        classScheduling: true,
        paymentProcessing: false,
        liveChat: true,
        newsletter: true
      },
      maintenance: {
        enabled: false,
        message: 'We are currently performing maintenance. Please check back soon!'
      }
    });

    console.log('⚙️  Created settings');

    console.log('✅ Database seeded successfully!');
    console.log(`👤 Admin login: ${adminUser.email} / ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

// Run the seed script
const runSeed = async () => {
  await connectDB();
  await seedData();
  process.exit(0);
};

runSeed();