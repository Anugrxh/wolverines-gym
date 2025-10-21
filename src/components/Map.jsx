import React from 'react';

const Map = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <h2 className="section-title">Find Us</h2>
        <p className="section-subtitle">
          Visit our state-of-the-art facility in the heart of the city
        </p>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-oswald font-bold text-2xl mb-6 text-black-2">
              Fitness Studio Location
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <span className="text-2xl">📍</span>
                <div>
                  <strong className="text-black-2 block mb-1">Address</strong>
                  <p className="text-gray-600">
                    123 Fitness Street, Downtown<br />
                    City, State 12345
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <span className="text-2xl">📞</span>
                <div>
                  <strong className="text-black-2 block mb-1">Phone</strong>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <span className="text-2xl">✉️</span>
                <div>
                  <strong className="text-black-2 block mb-1">Email</strong>
                  <p className="text-gray-600">info@fitnessstudio.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <span className="text-2xl">🕐</span>
                <div>
                  <strong className="text-black-2 block mb-1">Hours</strong>
                  <p className="text-gray-600">
                    Mon-Fri: 5:00 AM - 11:00 PM<br />
                    Sat-Sun: 6:00 AM - 10:00 PM<br />
                    <span className="text-harvest-gold font-semibold">
                      24/7 Access for Premium & Elite Members
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-oswald font-semibold text-lg mb-4 text-black-2">
                Facility Features
              </h4>
              <ul className="space-y-2">
                {[
                  'Free Parking Available',
                  'Public Transportation Nearby',
                  'Wheelchair Accessible',
                  'Changing Rooms & Showers',
                  'Juice Bar & Supplements'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-harvest-gold mr-2 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Fitness Studio Location"
              className="w-full h-full min-h-96"
            ></iframe>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="font-oswald font-bold text-2xl mb-8 text-center text-black-2">
            Getting Here
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <span className="text-4xl mb-4 block">🚗</span>
              <h4 className="font-oswald font-semibold text-lg mb-2 text-black-2">
                By Car
              </h4>
              <p className="text-gray-600">
                Free parking available in our dedicated lot. Street parking also available.
              </p>
            </div>
            
            <div className="text-center">
              <span className="text-4xl mb-4 block">🚇</span>
              <h4 className="font-oswald font-semibold text-lg mb-2 text-black-2">
                By Metro
              </h4>
              <p className="text-gray-600">
                Downtown Station is just 2 blocks away. Take the Red or Blue line.
              </p>
            </div>
            
            <div className="text-center">
              <span className="text-4xl mb-4 block">🚌</span>
              <h4 className="font-oswald font-semibold text-lg mb-2 text-black-2">
                By Bus
              </h4>
              <p className="text-gray-600">
                Bus routes 15, 23, and 45 stop directly in front of our building.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;