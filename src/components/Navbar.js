import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <img src="/gym logo-1.png" alt="Fitness Studio Logo" className="logo-image" />
            <h2>WOLVERINES </h2>
          </div>
          
          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
            <li><a href="#training" onClick={() => scrollToSection('training')}>Training</a></li>
            <li><a href="#trainers" onClick={() => scrollToSection('trainers')}>Trainers</a></li>
            <li><a href="#gallery" onClick={() => scrollToSection('gallery')}>Gallery</a></li>
            <li><a href="#pricing" onClick={() => scrollToSection('pricing')}>Pricing</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>

          <div className="nav-cta">
            <a href="#contact" className="btn" onClick={() => scrollToSection('contact')}>
              Join
            </a>
          </div>

          <div 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;