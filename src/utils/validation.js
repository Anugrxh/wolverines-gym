/**
 * Form validation utilities
 */

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return 'Email is required';
  }
  
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

// Phone validation
export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/\s|-|\(|\)/g, '');
  
  if (!phone) {
    return 'Phone number is required';
  }
  
  if (!phoneRegex.test(cleanPhone)) {
    return 'Please enter a valid phone number';
  }
  
  return null;
};

// Required field validation
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  
  return null;
};

// Minimum length validation
export const validateMinLength = (value, minLength, fieldName = 'This field') => {
  if (!value) {
    return null; // Let required validation handle empty values
  }
  
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters long`;
  }
  
  return null;
};

// Maximum length validation
export const validateMaxLength = (value, maxLength, fieldName = 'This field') => {
  if (!value) {
    return null; // Let required validation handle empty values
  }
  
  if (value.length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters long`;
  }
  
  return null;
};

// Name validation
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  
  if (!name) {
    return 'Name is required';
  }
  
  if (name.length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  if (!nameRegex.test(name)) {
    return 'Name can only contain letters and spaces';
  }
  
  return null;
};

// URL validation
export const validateUrl = (url) => {
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  
  if (!url) {
    return null; // URL is optional in most cases
  }
  
  if (!urlRegex.test(url)) {
    return 'Please enter a valid URL';
  }
  
  return null;
};

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain at least one number';
  }
  
  return null;
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return null;
};

// Generic form validation
export const validateForm = (formData, validationRules) => {
  const errors = {};
  
  Object.keys(validationRules).forEach(field => {
    const rules = validationRules[field];
    const value = formData[field];
    
    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Contact form validation rules
export const contactFormValidation = {
  name: [validateRequired, (value) => validateName(value)],
  email: [validateRequired, (value) => validateEmail(value)],
  phone: [validateRequired, (value) => validatePhone(value)],
  service: [validateRequired],
  message: [
    validateRequired,
    (value) => validateMinLength(value, 10, 'Message'),
    (value) => validateMaxLength(value, 500, 'Message')
  ]
};

// Newsletter signup validation
export const newsletterValidation = {
  email: [validateRequired, (value) => validateEmail(value)]
};

// Membership form validation
export const membershipValidation = {
  firstName: [validateRequired, (value) => validateName(value)],
  lastName: [validateRequired, (value) => validateName(value)],
  email: [validateRequired, (value) => validateEmail(value)],
  phone: [validateRequired, (value) => validatePhone(value)],
  plan: [validateRequired],
  emergencyContact: [validateRequired, (value) => validateName(value)],
  emergencyPhone: [validateRequired, (value) => validatePhone(value)]
};