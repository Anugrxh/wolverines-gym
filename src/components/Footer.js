import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/gym logo-1.png" alt="Fitness Studio Logo" className="footer-logo-image" />
              <h2>WOLVERINES FITNESS STUDIO</h2>
              <p>Transform your body, transform your life</p>
            </div>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="YouTube">📺</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
          
          {/* <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
              <li><a href="#about" onClick={() => scrollToSection('about')}>About Us</a></li>
              <li><a href="#training" onClick={() => scrollToSection('training')}>Training Programs</a></li>
              <li><a href="#trainers" onClick={() => scrollToSection('trainers')}>Our Trainers</a></li>
              <li><a href="#gallery" onClick={() => scrollToSection('gallery')}>Gallery</a></li>
              <li><a href="#pricing" onClick={() => scrollToSection('pricing')}>Membership</a></li>
            </ul>
          </div> */}
          
          <div className="footer-section">
            <h3>Training Programs</h3>
            <ul>
              <li><a href="#training">Weight Loss</a></li>
              <li><a href="#training">Muscle Building</a></li>
              <li><a href="#training">Functional Fitness</a></li>
              <li><a href="#training">HIIT Training</a></li>
              <li><a href="#training">Yoga & Flexibility</a></li>
              <li><a href="#training">Athletic Performance</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="icon">📍</span>
                <p>123 Fitness Street<br />Downtown, City 12345</p>
              </div>
              <div className="contact-item">
                <span className="icon">📞</span>
                <p>(555) 123-4567</p>
              </div>
              <div className="contact-item">
                <span className="icon">✉️</span>
                <p>info@wolverinesfitness.com</p>
              </div>
              <div className="contact-item">
                <span className="icon">🕐</span>
                <p>Mon-Fri: 5AM-11PM<br />Sat-Sun: 6AM-10PM</p>
              </div>
            </div>
          </div>
          
          {/* <div className="footer-section">
            
            <div className="certifications">
              <h4>Certifications</h4>
              <div className="cert-badges">
                <span className="cert-badge">NASM</span>
                <span className="cert-badge">ACE</span>
                <span className="cert-badge">ACSM</span>
              </div>
            </div>
          </div> */}
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Wolverines Fitness Studio. All rights reserved.</p>
            <div className="footer-links">
              
              <a href="#">Developed By Anugrah M V</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;