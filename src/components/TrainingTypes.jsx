import React from 'react';
import { trainingData } from '../data/mockData';

const TrainingTypes = () => {
  const trainingTypes = trainingData;

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