import React from 'react';

const Trainers = () => {
  const trainers = [
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

  return (
    <section id="trainers" className="section bg-snow">
      <div className="container">
        <h2 className="section-title">Meet Our Trainers</h2>
        <p className="section-subtitle">
          Our certified professionals are here to guide you every step of the way
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={trainer.image} 
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <a href="#" className="text-white text-2xl hover:text-harvest-gold transition-colors">
                      📷
                    </a>
                    <a href="#" className="text-white text-2xl hover:text-harvest-gold transition-colors">
                      📘
                    </a>
                    <a href="#" className="text-white text-2xl hover:text-harvest-gold transition-colors">
                      🐦
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-oswald font-bold text-xl mb-2 text-black-2">
                  {trainer.name}
                </h3>
                <p className="text-harvest-gold font-semibold mb-1">
                  {trainer.specialty}
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  {trainer.experience} Experience
                </p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {trainer.bio}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2 text-black-2">Certifications:</h4>
                  <div className="flex flex-wrap gap-1">
                    {trainer.certifications.map((cert, index) => (
                      <span 
                        key={index} 
                        className="bg-harvest-gold text-black text-xs px-2 py-1 rounded-full font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                
                <a href="#contact" className="btn btn-outline w-full text-center text-sm">
                  Book Session
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;