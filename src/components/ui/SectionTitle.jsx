import React from 'react';

/**
 * Reusable Section Title Component
 * @param {Object} props - Title properties
 * @param {string} props.title - Main title text
 * @param {string} props.subtitle - Subtitle text
 * @param {string} props.align - Text alignment (center, left, right)
 * @param {string} props.className - Additional CSS classes
 */
const SectionTitle = ({
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const alignClasses = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right'
  };

  return (
    <div className={`mb-12 ${alignClasses[align]} ${className}`}>
      {title && (
        <h2 className={`section-title ${align !== 'center' ? alignClasses[align] : ''}`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`section-subtitle ${align !== 'center' ? alignClasses[align] : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;