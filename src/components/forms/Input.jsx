import React, { forwardRef } from 'react';

/**
 * Reusable Input Component
 * @param {Object} props - Input properties
 * @param {string} props.type - Input type
 * @param {string} props.label - Input label
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Whether input is required
 * @param {string} props.className - Additional CSS classes
 */
const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  error,
  required = false,
  className = '',
  ...props
}, ref) => {
  const inputClasses = `
    w-full px-4 py-3 border rounded-lg transition-colors duration-300 focus:outline-none
    ${error 
      ? 'border-red-500 focus:border-red-500' 
      : 'border-gray-300 focus:border-harvest-gold'
    }
    ${className}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.name}-error` : undefined}
        {...props}
      />
      
      {error && (
        <p 
          id={`${props.name}-error`}
          className="text-sm text-red-600 flex items-center"
        >
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;