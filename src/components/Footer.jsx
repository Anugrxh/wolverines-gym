import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-dark text-white">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/gym logo-1.png" 
                alt="Fitness Studio Logo" 
                className="h-10 w-10 object-contain"
              />
              <h2 className="font-oswald font-bold text-xl tracking-wider">
                WOLVERINES FITNESS STUDIO
              </h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transform your body, transform your life
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-2xl hover:text-harvest-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                📘
              </a>
              <a 
                href="#" 
                className="text-2xl hover:text-harvest-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                📷
              </a>
              <a 
                href="#" 
                className="text-2xl hover:text-harvest-gold transition-colors duration-300"
                aria-label="Twitter"
              >
                🐦
              </a>
              <a 
                href="#" 
                className="text-2xl hover:text-harvest-gold transition-colors duration-300"
                aria-label="YouTube"
              >
                📺
              </a>
              <a 
                href="#" 
                className="text-2xl hover:text-harvest-gold transition-colors duration-300"
                aria-label="LinkedIn"
              >
                💼
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-oswald font-bold text-lg mb-6 text-harvest-gold">
              Training Programs
            </h3>
            <ul className="space-y-3">
              {[
                'Weight Loss',
                'Muscle Building',
                'Functional Fitness',
                'HIIT Training',
                'Yoga & Flexibility',
                'Athletic Performance'
              ].map((program, index) => (
                <li key={index}>
                  <a 
                    href="#training"
                    className="text-gray-300 hover:text-harvest-gold transition-colors duration-300"
                  >
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-oswald font-bold text-lg mb-6 text-harvest-gold">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-xl">📍</span>
                <p className="text-gray-300">
                  123 Fitness Street<br />
                  Downtown, City 12345
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">📞</span>
                <p className="text-gray-300">(555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">✉️</span>
                <p className="text-gray-300">info@wolverinesfitness.com</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-xl">🕐</span>
                <p className="text-gray-300">
                  Mon-Fri: 5AM-11PM<br />
                  Sat-Sun: 6AM-10PM
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {currentYear} Wolverines Fitness Studio. All rights reserved.
            </p>
            <div className="text-gray-400">
              <a 
                href="#" 
                className="hover:text-harvest-gold transition-colors duration-300"
              >
                Developed By Anugrah M V
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;