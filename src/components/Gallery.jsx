import React, { useState } from 'react';
import { galleryData } from '../data/mockData';
import { GALLERY_CATEGORIES } from '../config/constants';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const galleryItems = galleryData;

  const filters = GALLERY_CATEGORIES.map(category => ({
    key: category,
    label: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')
  }));

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="section bg-gray-50">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <p className="section-subtitle">
          Take a look inside our world-class facility and see our community in action
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`px-6 py-2 rounded-full font-semibold uppercase tracking-wide transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-gradient-primary text-black shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-harvest-gold hover:text-black border border-gray-300'
              }`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              {item.type === 'image' ? (
                <img 
                  src={item.src} 
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="relative">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-4 group-hover:bg-harvest-gold/80 transition-colors duration-300">
                      <span className="text-white text-2xl">▶</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-black">
                  <h3 className="font-oswald font-bold text-xl mb-2">{item.title}</h3>
                  <p className="font-medium">
                    {item.type === 'video' ? 'Watch Video' : 'View Image'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;