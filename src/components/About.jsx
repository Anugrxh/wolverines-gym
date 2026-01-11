import React from 'react';
import { aboutData } from '../data/mockData';

const About = () => {
  return (
    <section id="about" className="section bg-snow">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="about-text">
            <h2 className="section-title text-left">{aboutData.title}</h2>
            <p className="section-subtitle text-left">
              {aboutData.subtitle}
            </p>
            
            <div className="space-y-6 mb-8">
              {aboutData.description.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="space-y-6">
              {aboutData.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div>
                    <h4 className="font-oswald font-semibold text-lg mb-2 text-black-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={aboutData.image} 
              alt="Modern gym interior"
              className="rounded-lg shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-lg"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="font-oswald font-bold text-2xl mb-2">{aboutData.overlayContent.title}</h3>
              <p className="text-lg">{aboutData.overlayContent.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;