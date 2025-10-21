import React, { useState, useEffect } from 'react';

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
    <nav className="fixed top-0 left-0 w-full z-50 bg-black shadow-lg transition-all duration-300">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/gym logo-1.png" 
              alt="Fitness Studio Logo" 
              className="h-10 w-10 object-contain"
            />
            <h2 className="text-xl font-oswald font-bold text-white tracking-wider">
              WOLVERINES
            </h2>
          </div>
          
          <ul className={`hidden lg:flex items-center space-x-8 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          } lg:block`}>
            {['home', 'about', 'training', 'trainers', 'gallery', 'pricing', 'contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item}`}
                  onClick={() => scrollToSection(item)}
                  className="text-white hover:text-harvest-gold transition-colors duration-300 font-medium uppercase tracking-wide cursor-pointer"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <a 
              href="#contact" 
              className="btn"
              onClick={() => scrollToSection('contact')}
            >
              Join
            </a>
          </div>

          <div 
            className={`lg:hidden flex flex-col space-y-1 cursor-pointer ${
              isMobileMenuOpen ? 'transform rotate-90' : ''
            } transition-transform duration-300`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="block w-6 h-0.5 bg-white transition-all duration-300"></span>
            <span className="block w-6 h-0.5 bg-white transition-all duration-300"></span>
            <span className="block w-6 h-0.5 bg-white transition-all duration-300"></span>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        } pb-4`}>
          <ul className="flex flex-col space-y-4">
            {['home', 'about', 'training', 'trainers', 'gallery', 'pricing', 'contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item}`}
                  onClick={() => scrollToSection(item)}
                  className="text-white hover:text-harvest-gold transition-colors duration-300 font-medium uppercase tracking-wide cursor-pointer block"
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a 
                href="#contact" 
                className="btn"
                onClick={() => scrollToSection('contact')}
              >
                Join
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;