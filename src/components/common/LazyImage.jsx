import React, { useState, useRef, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

/**
 * Lazy Loading Image Component with error handling
 * @param {Object} props - Component properties
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.className - CSS classes
 * @param {string} props.fallback - Fallback image URL
 * @param {function} props.onLoad - Callback when image loads
 * @param {function} props.onError - Callback when image fails to load
 */
const LazyImage = ({
  src,
  alt,
  className = '',
  fallback = '/assests/placeholder.jpg',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = (e) => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    
    // Try fallback image
    if (e.target.src !== fallback) {
      e.target.src = fallback;
      return;
    }
    
    onError?.(e);
  };

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <LoadingSpinner size="sm" />
        </div>
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}
      
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2">🖼️</div>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;