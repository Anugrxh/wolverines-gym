import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you! We\'ll get back to you within 24 hours.');
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
      }, 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">Get Started Today</h2>
        <p className="section-subtitle">
          Ready to transform your life? Contact us to schedule your free consultation
        </p>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <h3>Why Choose Us?</h3>
              <div className="benefits-list">
                <div className="benefit-item">
                  <span className="benefit-icon">🎯</span>
                  <div>
                    <h4>Personalized Approach</h4>
                    <p>Every program is tailored to your specific goals and fitness level</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <span className="benefit-icon">🏆</span>
                  <div>
                    <h4>Proven Results</h4>
                    <p>500+ success stories and a 98% member satisfaction rate</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <span className="benefit-icon">👥</span>
                  <div>
                    <h4>Expert Support</h4>
                    <p>Certified trainers and nutritionists guide you every step</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <span className="benefit-icon">⚡</span>
                  <div>
                    <h4>Modern Facility</h4>
                    <p>State-of-the-art equipment and clean, spacious environment</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-methods">
              <h3>Get In Touch</h3>
              <div className="method-item">
                <span className="method-icon">📞</span>
                <div>
                  <strong>Call Us</strong>
                  <p>(555) 123-4567</p>
                </div>
              </div>
              
              <div className="method-item">
                <span className="method-icon">✉️</span>
                <div>
                  <strong>Email Us</strong>
                  <p>info@fitnessstudio.com</p>
                </div>
              </div>
              
              <div className="method-item">
                <span className="method-icon">💬</span>
                <div>
                  <strong>Live Chat</strong>
                  <p>Available 9 AM - 9 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Start Your Free Consultation</h3>
              
              {submitMessage && (
                <div className="success-message">
                  {submitMessage}
                </div>
              )}
              
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Your Interest</option>
                  <option value="weight-loss">Weight Loss Program</option>
                  <option value="muscle-building">Muscle Building</option>
                  <option value="functional-fitness">Functional Fitness</option>
                  <option value="hiit-training">HIIT Training</option>
                  <option value="yoga">Yoga & Flexibility</option>
                  <option value="athletic-performance">Athletic Performance</option>
                  <option value="personal-training">Personal Training</option>
                  <option value="membership">General Membership</option>
                </select>
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tell us about your fitness goals..."
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Get My Free Consultation'}
              </button>
              
              <p className="form-note">
                By submitting this form, you agree to receive communications from us. 
                We respect your privacy and will never share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;