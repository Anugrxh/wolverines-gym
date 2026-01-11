import React, { forwardRef } from 'react';

/**
 * Reusable Textarea Component
 * @param {Object} props - Textarea properties
 * @param {string} props.label - Textarea label
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Whether textarea is required
 * @param {number} props.rows - Number of rows
 * @param {string} props.className - Additional CSS classes
 */
const Textarea = forwardRef(({
  label,
  placeholder,
  error,
  required = false,
  rows = 4,
  className = '',
  ...props
}, ref) => {
  const textareaClasses = `
    w-full px-4 py-3 border rounded-lg transition-colors duration-300 focus:outline-none resize-none
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
      
      <textarea
        ref={ref}
        rows={rows}
        placeholder={placeholder}
        className={textareaClasses}
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

Textarea.displayName = 'Textarea';

export default Textarea;