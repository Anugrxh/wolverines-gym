import React from 'react';

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
        backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-dark opacity-80"></div>
      
      {/* Main Content */}
      <div className="relative flex-1 flex items-center justify-center pt-20">
        <div className="container">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-oswald font-bold mb-6 leading-tight">
              TRANSFORM YOUR
              <span className="block text-transparent bg-gradient-primary bg-clip-text">
                BODY
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Unleash your potential with our world-class training programs, 
              expert trainers, and state-of-the-art equipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#contact" 
                className="btn text-lg px-8 py-4"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              >
                Start Your Journey
              </a>
              <a 
                href="#about" 
                className="btn btn-outline text-lg- px-8 py-4"
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative bg-black/50 backdrop-blur-sm py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="stat-item">
              <h3 className="text-3xl md:text-4xl font-oswald font-bold text-harvest-gold mb-2">
                1000+
              </h3>
              <p className="text-gray-300 font-medium">Happy Members</p>
            </div>
            <div className="stat-item">
              <h3 className="text-3xl md:text-4xl font-oswald font-bold text-harvest-gold mb-2">
                3+
              </h3>
              <p className="text-gray-300 font-medium">Expert Trainers</p>
            </div>
            <div className="stat-item">
              <h3 className="text-3xl md:text-4xl font-oswald font-bold text-harvest-gold mb-2">
                10+
              </h3>
              <p className="text-gray-300 font-medium">Years Experience</p>
            </div>
            <div className="stat-item">
              <h3 className="text-3xl md:text-4xl font-oswald font-bold text-harvest-gold mb-2">
                24/7
              </h3>
              <p className="text-gray-300 font-medium">Gym Access</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;