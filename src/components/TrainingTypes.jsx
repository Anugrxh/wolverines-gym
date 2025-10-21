import React from 'react';

const TrainingTypes = () => {
  const trainingTypes = [
    {
      id: 1,
      title: 'Weight Loss',
      description: 'Burn calories and shed pounds with our comprehensive weight loss programs combining cardio and strength training.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Cardio Workouts', 'Nutrition Guidance', 'Progress Tracking', 'Personal Support']
    },
    {
      id: 2,
      title: 'Muscle Building',
      description: 'Build lean muscle mass and increase strength with our specialized muscle building programs.',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Strength Training', 'Progressive Overload', 'Muscle Recovery', 'Supplement Advice']
    },
    {
      id: 3,
      title: 'Functional Fitness',
      description: 'Improve your daily movement patterns and overall functional strength for better quality of life.',
      image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Movement Patterns', 'Core Stability', 'Balance Training', 'Injury Prevention']
    },
    {
      id: 4,
      title: 'HIIT Training',
      description: 'High-intensity interval training for maximum calorie burn and improved cardiovascular fitness.',
      image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['High Intensity', 'Time Efficient', 'Metabolic Boost', 'Group Classes']
    },
    {
      id: 5,
      title: 'Yoga & Flexibility',
      description: 'Enhance flexibility, balance, and mental well-being through our yoga and stretching programs.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Flexibility', 'Stress Relief', 'Mind-Body Connection', 'Various Styles']
    },
    {
      id: 6,
      title: 'Athletic Performance',
      description: 'Sport-specific training to enhance athletic performance and competitive edge.',
      image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Sport Specific', 'Performance Metrics', 'Speed & Agility', 'Competition Prep']
    }
  ];

  return (
    <section id="training" className="section bg-gray-50">
      <div className="container">
        <h2 className="section-title">Training Programs</h2>
        <p className="section-subtitle">
          Choose from our diverse range of training programs designed to meet your specific fitness goals
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainingTypes.map((training) => (
            <div key={training.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={training.image} 
                  alt={training.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-white font-oswald font-bold text-2xl text-center">
                    {training.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-oswald font-bold text-xl mb-3 text-black-2">
                  {training.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {training.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {training.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="text-harvest-gold mr-2 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a href="#contact" className="btn btn-outline w-full text-center">
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingTypes;