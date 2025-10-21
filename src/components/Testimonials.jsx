import React, { useState, useEffect } from 'react';

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
      <span key={index} className={`text-2xl ${index < rating ? 'text-harvest-gold' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="section bg-snow">
      <div className="container">
        <h2 className="section-title">What Our Members Say</h2>
        <p className="section-subtitle">
          Real stories from real people who transformed their lives with us
        </p>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative h-96 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === currentTestimonial 
                    ? 'opacity-100 transform translate-x-0' 
                    : 'opacity-0 transform translate-x-full'
                }`}
              >
                <div className="bg-white rounded-lg shadow-xl p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-6xl text-harvest-gold mb-4 font-serif">"</div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {testimonial.text}
                    </p>
                    <div className="flex justify-center mb-6">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div className="text-center">
                      <h4 className="font-oswald font-bold text-lg text-black-2">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 mb-1">{testimonial.role}</p>
                      <span className="bg-harvest-gold text-black text-sm px-3 py-1 rounded-full font-medium">
                        {testimonial.result}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentTestimonial ? 'bg-harvest-gold' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <h3 className="text-4xl font-oswald font-bold text-harvest-gold mb-2">98%</h3>
            <p className="text-gray-600 font-medium">Member Satisfaction</p>
          </div>
          <div>
            <h3 className="text-4xl font-oswald font-bold text-harvest-gold mb-2">500+</h3>
            <p className="text-gray-600 font-medium">Success Stories</p>
          </div>
          <div>
            <h3 className="text-4xl font-oswald font-bold text-harvest-gold mb-2">4.9/5</h3>
            <p className="text-gray-600 font-medium">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;