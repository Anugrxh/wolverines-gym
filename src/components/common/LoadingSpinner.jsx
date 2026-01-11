import React from 'react';

/**
 * Loading Spinner Component
 * @param {Object} props - Component properties
 * @param {string} props.size - Spinner size (sm, md, lg, xl)
 * @param {string} props.color - Spinner color (primary, white, dark)
 * @param {string} props.text - Loading text
 * @param {boolean} props.fullScreen - Whether to show full screen loading
 */
const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  text = 'Loading...', 
  fullScreen = false 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colors = {
    primary: 'border-harvest-gold',
    white: 'border-white',
    dark: 'border-gray-800'
  };

  const spinnerClasses = `
    ${sizes[size]} 
    border-4 
    ${colors[color]} 
    border-t-transparent 
    rounded-full 
    animate-spin
  `;

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={spinnerClasses}></div>
      {text && (
        <p className="text-gray-600 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;