import React from 'react';
import './Trainers.css';

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
    <section id="trainers" className="section trainers">
      <div className="container">
        <h2 className="section-title">Meet Our Trainers</h2>
        <p className="section-subtitle">
          Our certified professionals are here to guide you every step of the way
        </p>
        
        <div className="trainers-grid">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="trainer-card">
              <div className="trainer-image">
                <img src={trainer.image} alt={trainer.name} />
                <div className="trainer-overlay">
                  <div className="social-links">
                    <a href="#" aria-label="Instagram">📷</a>
                    <a href="#" aria-label="Facebook">📘</a>
                    <a href="#" aria-label="Twitter">🐦</a>
                  </div>
                </div>
              </div>
              
              <div className="trainer-info">
                <h3>{trainer.name}</h3>
                <p className="specialty">{trainer.specialty}</p>
                <p className="experience">{trainer.experience} Experience</p>
                <p className="bio">{trainer.bio}</p>
                
                <div className="certifications">
                  <h4>Certifications:</h4>
                  <div className="cert-tags">
                    {trainer.certifications.map((cert, index) => (
                      <span key={index} className="cert-tag">{cert}</span>
                    ))}
                  </div>
                </div>
                
                <a href="#contact" className="btn btn-outline">
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