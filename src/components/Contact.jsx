import React, { useState } from 'react';

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
    <section id="contact" className="section bg-snow">
      <div className="container">
        <h2 className="section-title">Get Started Today</h2>
        <p className="section-subtitle">
          Ready to transform your life? Contact us to schedule your free consultation
        </p>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="font-oswald font-bold text-2xl mb-6 text-black-2">Why Choose Us?</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h4 className="font-oswald font-semibold text-lg mb-2 text-black-2">
                      Personalized Approach
                    </h4>
                    <p className="text-gray-600">
                      Every program is tailored to your specific goals and fitness level
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">🏆</span>
                  <div>
                    <h4 className="font-oswald font-semibold text-lg mb-2 text-black-2">
                      Proven Results
                    </h4>
                    <p className="text-gray-600">
                      500+ success stories and a 98% member satisfaction rate
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">👥</span>
                  <div>
                    <h4 className="font-oswald font-semibold text-lg mb-2 text-black-2">
                      Expert Support
                    </h4>
                    <p className="text-gray-600">
                      Certified trainers and nutritionists guide you every step
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">⚡</span>
                  <div>
                    <h4 className="font-oswald font-semibold text-lg mb-2 text-black-2">
                      Modern Facility
                    </h4>
                    <p className="text-gray-600">
                      State-of-the-art equipment and clean, spacious environment
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="font-oswald font-bold text-2xl mb-6 text-black-2">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">📞</span>
                  <div>
                    <strong className="text-black-2">Call Us</strong>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <strong className="text-black-2">Email Us</strong>
                    <p className="text-gray-600">info@fitnessstudio.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">💬</span>
                  <div>
                    <strong className="text-black-2">Live Chat</strong>
                    <p className="text-gray-600">Available 9 AM - 9 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit}>
              <h3 className="font-oswald font-bold text-2xl mb-6 text-black-2">
                Start Your Free Consultation
              </h3>
              
              {submitMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  {submitMessage}
                </div>
              )}
              
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-harvest-gold transition-colors"
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-harvest-gold transition-colors"
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-harvest-gold transition-colors"
                />
                
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-harvest-gold transition-colors"
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
                
                <textarea
                  name="message"
                  placeholder="Tell us about your fitness goals..."
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-harvest-gold transition-colors resize-none"
                ></textarea>
                
                <button 
                  type="submit" 
                  className="btn w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Get My Free Consultation'}
                </button>
                
                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to receive communications from us. 
                  We respect your privacy and will never share your information.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;