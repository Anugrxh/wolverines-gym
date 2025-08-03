import React from 'react';
import './Map.css';

const Map = () => {
  return (
    <section className="section map-section">
      <div className="container">
        <h2 className="section-title">Find Us</h2>
        <p className="section-subtitle">
          Visit our state-of-the-art facility in the heart of the city
        </p>
        
        <div className="map-container">
          <div className="map-info">
            <div className="location-card">
              <h3>Fitness Studio Location</h3>
              <div className="location-details">
                <div className="detail-item">
                  <span className="icon">📍</span>
                  <div>
                    <strong>Address</strong>
                    <p>123 Fitness Street, Downtown<br />City, State 12345</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <span className="icon">📞</span>
                  <div>
                    <strong>Phone</strong>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <span className="icon">✉️</span>
                  <div>
                    <strong>Email</strong>
                    <p>info@fitnessstudio.com</p>
                  </div>
                </div>
                
                <div className="detail-item">
                  <span className="icon">🕐</span>
                  <div>
                    <strong>Hours</strong>
                    <p>
                      Mon-Fri: 5:00 AM - 11:00 PM<br />
                      Sat-Sun: 6:00 AM - 10:00 PM<br />
                      <span className="highlight">24/7 Access for Premium & Elite Members</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="location-features">
                <h4>Facility Features</h4>
                <ul>
                  <li>Free Parking Available</li>
                  <li>Public Transportation Nearby</li>
                  <li>Wheelchair Accessible</li>
                  <li>Changing Rooms & Showers</li>
                  <li>Juice Bar & Supplements</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="map-embed">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Fitness Studio Location"
            ></iframe>
          </div>
        </div>
        
        <div className="directions-info">
          <h3>Getting Here</h3>
          <div className="directions-grid">
            <div className="direction-item">
              <span className="transport-icon">🚗</span>
              <div>
                <h4>By Car</h4>
                <p>Free parking available in our dedicated lot. Street parking also available.</p>
              </div>
            </div>
            
            <div className="direction-item">
              <span className="transport-icon">🚇</span>
              <div>
                <h4>By Metro</h4>
                <p>Downtown Station is just 2 blocks away. Take the Red or Blue line.</p>
              </div>
            </div>
            
            <div className="direction-item">
              <span className="transport-icon">🚌</span>
              <div>
                <h4>By Bus</h4>
                <p>Bus routes 15, 23, and 45 stop directly in front of our building.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;