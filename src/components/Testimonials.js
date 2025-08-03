import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Jessica Martinez',
      role: 'Weight Loss Success',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      text: 'I lost 30 pounds in 6 months! The trainers here are amazing and the community is so supportive. This gym changed my life completely.',
      rating: 5,
      result: 'Lost 30 lbs'
    },
    {
      id: 2,
      name: 'Robert Johnson',
      role: 'Strength Training',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      text: 'The equipment is top-notch and the trainers really know their stuff. I\'ve gained 15 pounds of muscle in just 4 months.',
      rating: 5,
      result: 'Gained 15 lbs muscle'
    },
    {
      id: 3,
      name: 'Maria Garcia',
      role: 'Fitness Transformation',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      text: 'From couch potato to marathon runner! The personalized training program helped me achieve goals I never thought possible.',
      rating: 5,
      result: 'Marathon Finisher'
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Athletic Performance',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      text: 'As a professional athlete, I needed specialized training. This gym provided exactly what I needed to take my performance to the next level.',
      rating: 5,
      result: 'Pro Athlete'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="section testimonials">
      <div className="container">
        <h2 className="section-title">What Our Members Say</h2>
        <p className="section-subtitle">
          Real stories from real people who transformed their lives with us
        </p>
        
        <div className="testimonials-container">
          <div className="testimonial-slider">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card ${
                  index === currentTestimonial ? 'active' : ''
                }`}
              >
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                    <span className="result-badge">{testimonial.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="testimonials-stats">
          <div className="stat-item">
            <h3>98%</h3>
            <p>Member Satisfaction</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Success Stories</p>
          </div>
          <div className="stat-item">
            <h3>4.9/5</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;