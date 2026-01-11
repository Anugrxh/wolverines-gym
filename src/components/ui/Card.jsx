import React from 'react';

/**
 * Reusable Card Component
 * @param {Object} props - Card properties
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hover - Whether to show hover effects
 * @param {string} props.padding - Padding size (sm, md, lg)
 */
const Card = ({
  children,
  className = '',
  hover = true,
  padding = 'md',
  ...props
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-lg overflow-hidden';
  const hoverClasses = hover ? 'hover:shadow-xl transition-shadow duration-300' : '';
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    none: ''
  };
  
  const cardClasses = `${baseClasses} ${hoverClasses} ${paddings[padding]} ${className}`;

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;