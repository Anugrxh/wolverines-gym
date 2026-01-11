import React from 'react';

/**
 * Reusable Button Component
 * @param {Object} props - Button properties
 * @param {string} props.variant - Button variant (primary, outline, ghost)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold uppercase tracking-wide transition-all duration-300 border-0 cursor-pointer rounded-full';
  
  const variants = {
    primary: 'bg-gradient-primary text-black hover:transform hover:-translate-y-0.5 hover:shadow-lg',
    outline: 'bg-transparent border-2 border-harvest-gold text-black hover:bg-gradient-primary hover:text-black',
    ghost: 'bg-transparent text-harvest-gold hover:bg-harvest-gold hover:text-black'
  };
  
  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-8 text-base',
    lg: 'py-4 px-10 text-lg'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;