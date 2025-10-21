import React from 'react';

const About = () => {
  return (
    <section id="about" className="section bg-snow">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="about-text">
            <h2 className="section-title text-left">About Our Gym</h2>
            <p className="section-subtitle text-left">
              We're more than just a gym - we're your partners in achieving your fitness goals.
            </p>
            
            <div className="space-y-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                With over 5 years of experience in the fitness industry, we've helped hundreds 
                of people transform their lives through fitness. Our state-of-the-art facility 
                features the latest equipment and a team of certified trainers dedicated to 
                your success.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Whether you're a beginner taking your first steps into fitness or an experienced 
                athlete looking to push your limits, we have the programs, equipment, and expertise 
                to help you reach your goals.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🏋️</div>
                <div>
                  <h4 className="font-oswald font-semibold text-lg mb-2 text-black-2">
                    Modern Equipment
                  </h4>
                  <p className="text-gray-600">
                    Latest fitness technology and equipment for optimal results
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-4xl">👨‍💼</div>
                <div>
                  <h4 className="font-oswald font-semibold text-lg mb-2 text-black-2">
                    Expert Trainers
                  </h4>
                  <p className="text-gray-600">
                    Certified professionals with years of experience
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🕐</div>
                <div>
                  <h4 className="font-oswald font-semibold text-lg mb-2 text-black-2">
                    Flexible Hours
                  </h4>
                  <p className="text-gray-600">
                    24/7 access to fit your busy lifestyle
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Modern gym interior"
              className="rounded-lg shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-lg"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="font-oswald font-bold text-2xl mb-2">Join Our Community</h3>
              <p className="text-lg">500+ Members Strong</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;