// Mock data for development and testing

export const heroData = {
  title: 'TRANSFORM YOUR',
  highlightText: 'BODY',
  subtitle: 'Unleash your potential with our world-class training programs, expert trainers, and state-of-the-art equipment.',
  backgroundImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
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
};

export const aboutData = {
  title: 'About Our Gym',
  subtitle: "We're more than just a gym - we're your partners in achieving your fitness goals.",
  description: [
    "With over 5 years of experience in the fitness industry, we've helped hundreds of people transform their lives through fitness. Our state-of-the-art facility features the latest equipment and a team of certified trainers dedicated to your success.",
    "Whether you're a beginner taking your first steps into fitness or an experienced athlete looking to push your limits, we have the programs, equipment, and expertise to help you reach your goals."
  ],
  image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  features: [
    {
      icon: '',
      title: 'Modern Equipment',
      description: 'Latest fitness technology and equipment for optimal results'
    },
    {
      icon: '',
      title: 'Expert Trainers',
      description: 'Certified professionals with years of experience'
    },
    {
      icon: '',
      title: 'Flexible Hours',
      description: '24/7 access to fit your busy lifestyle'
    }
  ],
  overlayContent: {
    title: 'Join Our Community',
    subtitle: '500+ Members Strong'
  }
};

export const trainingData = [
  {
    id: 1,
    title: 'Weight Loss',
    description: 'Burn calories and shed pounds with our comprehensive weight loss programs combining cardio and strength training.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    features: ['Cardio Workouts', 'Nutrition Guidance', 'Progress Tracking', 'Personal Support'],
    category: 'weight-loss'
  },
  {
    id: 2,
    title: 'Muscle Building',
    description: 'Build lean muscle mass and increase strength with our specialized muscle building programs.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    features: ['Strength Training', 'Progressive Overload', 'Muscle Recovery', 'Supplement Advice'],
    category: 'muscle-building'
  },
  {
    id: 3,
    title: 'Functional Fitness',
    description: 'Improve your daily movement patterns and overall functional strength for better quality of life.',
    image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    features: ['Movement Patterns', 'Core Stability', 'Balance Training', 'Injury Prevention'],
    category: 'functional-fitness'
  },
  {
    id: 4,
    title: 'HIIT Training',
    description: 'High-intensity interval training for maximum calorie burn and improved cardiovascular fitness.',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    features: ['High Intensity', 'Time Efficient', 'Metabolic Boost', 'Group Classes'],
    category: 'hiit-training'
  },
  {
    id: 5,
    title: 'Yoga & Flexibility',
    description: 'Enhance flexibility, balance, and mental well-being through our yoga and stretching programs.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    features: ['Flexibility', 'Stress Relief', 'Mind-Body Connection', 'Various Styles'],
    category: 'yoga'
  },
  {
    id: 6,
    title: 'Athletic Performance',
    description: 'Sport-specific training to enhance athletic performance and competitive edge.',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    features: ['Sport Specific', 'Performance Metrics', 'Speed & Agility', 'Competition Prep'],
    category: 'athletic-performance'
  }
];

export const trainersData = [
  {
    id: 1,
    name: 'Mike Johnson',
    specialty: 'Strength & Conditioning',
    experience: '8 Years',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Certified personal trainer specializing in strength training and muscle building.',
    certifications: ['NASM-CPT', 'CSCS', 'Nutrition Specialist']
  },
  {
    id: 2,
    name: 'Sarah Williams',
    specialty: 'Weight Loss & Cardio',
    experience: '6 Years',
    image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Expert in weight loss programs and cardiovascular fitness training.',
    certifications: ['ACE-CPT', 'Weight Management', 'Group Fitness']
  },
  {
    id: 3,
    name: 'David Chen',
    specialty: 'Functional Training',
    experience: '7 Years',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Focuses on functional movement patterns and injury prevention.',
    certifications: ['FMS', 'NASM-CES', 'Mobility Specialist']
  },
  {
    id: 4,
    name: 'Emma Rodriguez',
    specialty: 'Yoga & Flexibility',
    experience: '5 Years',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    bio: 'Certified yoga instructor with expertise in flexibility and mindfulness.',
    certifications: ['RYT-500', 'Yin Yoga', 'Meditation Teacher']
  }
];

export const testimonialsData = [
  {
    id: 1,
    name: 'Jessica Martinez',
    role: 'Weight Loss Success',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    text: 'I lost 30 pounds in 6 months! The trainers here are amazing and the community is so supportive. This gym changed my life completely.',
    rating: 5,
    result: 'Lost 30 lbs'
  },
  {
    id: 2,
    name: 'Robert Johnson',
    role: 'Strength Training',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    text: "The equipment is top-notch and the trainers really know their stuff. I've gained 15 pounds of muscle in just 4 months.",
    rating: 5,
    result: 'Gained 15 lbs muscle'
  },
  {
    id: 3,
    name: 'Maria Garcia',
    role: 'Fitness Transformation',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    text: 'From couch potato to marathon runner! The personalized training program helped me achieve goals I never thought possible.',
    rating: 5,
    result: 'Marathon Finisher'
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Athletic Performance',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    text: 'As a professional athlete, I needed specialized training. This gym provided exactly what I needed to take my performance to the next level.',
    rating: 5,
    result: 'Pro Athlete'
  }
];

export const pricingData = [
  {
    id: 1,
    name: 'Basic',
    price: 29,
    period: 'month',
    popular: false,
    description: 'Perfect for beginners starting their fitness journey',
    features: [
      'Gym Access (6am - 10pm)',
      'Basic Equipment Usage',
      'Locker Room Access',
      'Free Fitness Assessment',
      'Mobile App Access',
      'Community Support'
    ],
    buttonText: 'Get Started'
  },
  {
    id: 2,
    name: 'Premium',
    price: 59,
    period: 'month',
    popular: true,
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
    buttonText: 'Most Popular'
  },
  {
    id: 3,
    name: 'Elite',
    price: 99,
    period: 'month',
    popular: false,
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
    buttonText: 'Go Elite'
  }
];

export const galleryData = [
  {
    id: 1,
    type: 'image',
    category: 'equipment',
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Modern Equipment'
  },
  {
    id: 2,
    type: 'video',
    category: 'training',
    src: 'https://player.vimeo.com/video/76979871',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Training Session'
  },
  {
    id: 3,
    type: 'image',
    category: 'facility',
    src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Gym Interior'
  },
  {
    id: 4,
    type: 'image',
    category: 'training',
    src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Personal Training'
  },
  {
    id: 5,
    type: 'video',
    category: 'classes',
    src: 'https://player.vimeo.com/video/76979871',
    thumbnail: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Group Classes'
  },
  {
    id: 6,
    type: 'image',
    category: 'equipment',
    src: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Cardio Zone'
  },
  {
    id: 7,
    type: 'image',
    category: 'facility',
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Yoga Studio'
  },
  {
    id: 8,
    type: 'video',
    category: 'training',
    src: 'https://player.vimeo.com/video/76979871',
    thumbnail: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'HIIT Training'
  }
];

// Contact form data
export const contactData = {
  title: 'Get Started Today',
  subtitle: 'Ready to transform your life? Contact us to schedule your free consultation',
  benefits: [
    {
      icon: '🎯',
      title: 'Personalized Approach',
      description: 'Every program is tailored to your specific goals and fitness level'
    },
    {
      icon: '🏆',
      title: 'Proven Results',
      description: '500+ success stories and a 98% member satisfaction rate'
    },
    {
      icon: '👥',
      title: 'Expert Support',
      description: 'Certified trainers and nutritionists guide you every step'
    },
    {
      icon: '⚡',
      title: 'Modern Facility',
      description: 'State-of-the-art equipment and clean, spacious environment'
    }
  ],
  contactMethods: [
    { icon: '📞', title: 'Call Us', content: '(555) 123-4567' },
    { icon: '✉️', title: 'Email Us', content: 'info@wolverinesfitness.com' },
    { icon: '💬', title: 'Live Chat', content: 'Available 9 AM - 9 PM' }
  ],
  serviceOptions: [
    { value: 'weight-loss', label: 'Weight Loss Program' },
    { value: 'muscle-building', label: 'Muscle Building' },
    { value: 'functional-fitness', label: 'Functional Fitness' },
    { value: 'hiit-training', label: 'HIIT Training' },
    { value: 'yoga', label: 'Yoga & Flexibility' },
    { value: 'athletic-performance', label: 'Athletic Performance' },
    { value: 'personal-training', label: 'Personal Training' },
    { value: 'membership', label: 'General Membership' }
  ]
};