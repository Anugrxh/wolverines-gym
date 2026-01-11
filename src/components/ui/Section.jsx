import React from 'react';

/**
 * Reusable Section Component
 * @param {Object} props - Section properties
 * @param {string} props.id - Section ID for navigation
 * @param {React.ReactNode} props.children - Section content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.background - Background variant (default, gray, dark)
 */
const Section = ({
  id,
  children,
  className = '',
  background = 'default',
  ...props
}) => {
  const backgrounds = {
    default: 'bg-snow',
    gray: 'bg-gray-50',
    dark: 'bg-gradient-dark text-white'
  };
  
  const sectionClasses = `section ${backgrounds[background]} ${className}`;

  return (
    <section id={id} className={sectionClasses} {...props}>
      <div className="container">
        {children}
      </div>
    </section>
  );
};

export default Section;