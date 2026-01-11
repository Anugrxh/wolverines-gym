import React from 'react';
import { heroData } from '../data/mockData';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${heroData.backgroundImage}')`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-dark opacity-80"></div>
      
      {/* Main Content */}
      <div className="relative flex-1 flex items-center justify-center pt-20">
        <div className="container">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-oswald font-bold mb-6 leading-tight">
              {heroData.title}
              <span className="block text-transparent bg-gradient-primary bg-clip-text">
                {heroData.highlightText}
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {heroData.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#contact" 
                className="btn text-lg px-8 py-4"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              >
                {heroData.buttons[0].text}
              </a>
             
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative bg-black/50 backdrop-blur-sm py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {heroData.stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <h3 className="text-3xl md:text-4xl font-oswald font-bold text-harvest-gold mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;