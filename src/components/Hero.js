import React from 'react';
import './Hero.css';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      
      {/* This new wrapper allows the main content to grow and push the stats down */}
      <div className="hero-main">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              TRANSFORM YOUR
              <span className="highlight"> BODY</span>
            </h1>
            <p className="hero-subtitle">
              Unleash your potential with our world-class training programs, 
              expert trainers, and state-of-the-art equipment.
            </p>
            <div className="hero-buttons">
              <a 
                href="#contact" 
                className="btn"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              >
                Start Your Journey
              </a>
              <a 
                href="#about" 
                className="btn btn-outline"
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Happy Members</p>
            </div>
            <div className="stat-item">
              <h3>3+</h3>
              <p>Expert Trainers</p>
            </div>
            <div className="stat-item">
              <h3>10+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Gym Access</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;