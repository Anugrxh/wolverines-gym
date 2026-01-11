import React, { forwardRef } from 'react';

/**
 * Reusable Select Component
 * @param {Object} props - Select properties
 * @param {string} props.label - Select label
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Whether select is required
 * @param {Array} props.options - Select options
 * @param {string} props.className - Additional CSS classes
 */
const Select = forwardRef(({
  label,
  placeholder = 'Select an option',
  error,
  required = false,
  options = [],
  className = '',
  ...props
}, ref) => {
  const selectClasses = `
    w-full px-4 py-3 border rounded-lg transition-colors duration-300 focus:outline-none bg-white
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
      
      <select
        ref={ref}
        className={selectClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.name}-error` : undefined}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option 
            key={index} 
            value={typeof option === 'object' ? option.value : option}
          >
            {typeof option === 'object' ? option.label : option}
          </option>
        ))}
      </select>
      
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

Select.displayName = 'Select';

export default Select;