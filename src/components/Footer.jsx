import React from 'react';
import { scrollToSection } from '../utils/helpers';
import { ASSETS, APP_CONFIG, SOCIAL_LINKS } from '../config/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const trainingPrograms = [
    'Weight Loss',
    'Muscle Building', 
    'Functional Fitness',
    'HIIT Training',
    'Yoga & Flexibility',
    'Athletic Performance'
  ];

  const contactInfo = [
    {
      icon: '📍',
      content: (
        <>
          123 Fitness Street<br />
          Downtown, City 12345
        </>
      )
    },
    {
      icon: '📞',
      content: '(555) 123-4567'
    },
    {
      icon: '✉️',
      content: 'info@wolverinesfitness.com'
    },
    {
      icon: '🕐',
      content: (
        <>
          Mon-Fri: 5AM-11PM<br />
          Sat-Sun: 6AM-10PM
        </>
      )
    }
  ];

  const socialMediaLinks = [
    { icon: '📘', label: 'Facebook', href: SOCIAL_LINKS.facebook },
    { icon: '📷', label: 'Instagram', href: SOCIAL_LINKS.instagram },
    { icon: '🐦', label: 'Twitter', href: SOCIAL_LINKS.twitter },
    { icon: '📺', label: 'YouTube', href: SOCIAL_LINKS.youtube },
    { icon: '💼', label: 'LinkedIn', href: SOCIAL_LINKS.linkedin }
  ];

  return (
    <footer className="bg-gradient-dark text-white">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={ASSETS.logo}
                alt={`${APP_CONFIG.name} Logo`}
                className="h-10 w-10 object-contain"
                onError={(e) => {
                  console.error('Footer logo failed to load:', e.target.src);
                  e.target.style.display = 'none';
                }}
              />
              <h2 className="font-oswald font-bold text-xl tracking-wider">
                {APP_CONFIG.name.toUpperCase()}
              </h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {APP_CONFIG.tagline}
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialMediaLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="text-2xl hover:text-harvest-gold transition-colors duration-300"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Training Programs Section */}
          <div>
            <h3 className="font-oswald font-bold text-lg mb-6 text-harvest-gold">
              Training Programs
            </h3>
            <ul className="space-y-3">
              {trainingPrograms.map((program, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection('training')}
                    className="text-gray-300 hover:text-harvest-gold transition-colors duration-300 text-left"
                  >
                    {program}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info Section */}
          <div>
            <h3 className="font-oswald font-bold text-lg mb-6 text-harvest-gold">
              Contact Info
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-xl">{info.icon}</span>
                  <p className="text-gray-300">{info.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {currentYear} {APP_CONFIG.name}. All rights reserved.
            </p>
            <div className="text-gray-400">
              <a 
                href="#" 
                className="hover:text-harvest-gold transition-colors duration-300"
              >
                Developed By {APP_CONFIG.author}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;