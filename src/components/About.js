import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About Our Gym</h2>
            <p className="section-subtitle">
              We're more than just a gym - we're your partners in achieving your fitness goals.
            </p>
            
            <div className="about-description">
              <p>
                With over 5 years of experience in the fitness industry, we've helped hundreds 
                of people transform their lives through fitness. Our state-of-the-art facility 
                features the latest equipment and a team of certified trainers dedicated to 
                your success.
              </p>
              
              <p>
                Whether you're a beginner taking your first steps into fitness or an experienced 
                athlete looking to push your limits, we have the programs, equipment, and expertise 
                to help you reach your goals.
              </p>
            </div>

            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon">🏋️</div>
                <div className="feature-content">
                  <h4>Modern Equipment</h4>
                  <p>Latest fitness technology and equipment for optimal results</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">👨‍💼</div>
                <div className="feature-content">
                  <h4>Expert Trainers</h4>
                  <p>Certified professionals with years of experience</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🕐</div>
                <div className="feature-content">
                  <h4>Flexible Hours</h4>
                  <p>24/7 access to fit your busy lifestyle</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Modern gym interior"
            />
            <div className="image-overlay">
              <div className="overlay-content">
                <h3>Join Our Community</h3>
                <p>500+ Members Strong</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;