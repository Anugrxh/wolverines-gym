import React, { useState } from 'react';
import { Section, SectionTitle, Button } from './ui';
import { Input, Select, Textarea } from './forms';
import { validateForm, contactFormValidation } from '../utils/validation';
import { CONTACT_INFO } from '../config/constants';
import { contactData } from '../data/mockData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitType, setSubmitType] = useState(''); // 'success' or 'error'

  const serviceOptions = contactData.serviceOptions;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateForm(formData, contactFormValidation);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate form submission (no backend needed)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage('Thank you! We\'ll get back to you within 24 hours.');
      setSubmitType('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('');
        setSubmitType('');
      }, 5000);
      
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again.');
      setSubmitType('error');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('');
        setSubmitType('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" background="default">
      <SectionTitle 
        title={contactData.title}
        subtitle={contactData.subtitle}
      />
      
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Benefits Section */}
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-oswald font-bold text-2xl mb-6 text-black-2">Why Choose Us?</h3>
            <div className="space-y-6">
              {contactData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <span className="text-3xl">{benefit.icon}</span>
                  <div>
                    <h4 className="font-oswald font-semibold text-lg mb-2 text-black-2">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Methods */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-oswald font-bold text-2xl mb-6 text-black-2">Get In Touch</h3>
            <div className="space-y-4">
              {contactData.contactMethods.map((method, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <strong className="text-black-2">{method.title}</strong>
                    <p className="text-gray-600">{method.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} noValidate>
            <h3 className="font-oswald font-bold text-2xl mb-6 text-black-2">
              Start Your Free Consultation
            </h3>
            
            {/* Success/Error Message */}
            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitType === 'success' 
                  ? 'bg-green-100 border border-green-400 text-green-700' 
                  : 'bg-red-100 border border-red-400 text-red-700'
              }`}>
                <div className="flex items-center">
                  <span className="mr-2">
                    {submitType === 'success' ? '✅' : '❌'}
                  </span>
                  {submitMessage}
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              <Input
                type="text"
                name="name"
                label="Full Name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
              
              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
              
              <Input
                type="tel"
                name="phone"
                label="Phone Number"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
              />
              
              <Select
                name="service"
                label="Service Interest"
                placeholder="Select Your Interest"
                value={formData.service}
                onChange={handleChange}
                options={serviceOptions}
                error={errors.service}
                required
              />
              
              <Textarea
                name="message"
                label="Message"
                placeholder="Tell us about your fitness goals..."
                rows={4}
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                required
              />
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : 'Get My Free Consultation'}
              </Button>
              
              <p className="text-sm text-gray-500 text-center">
                By submitting this form, you agree to receive communications from us. 
                We respect your privacy and will never share your information.
              </p>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Contact;