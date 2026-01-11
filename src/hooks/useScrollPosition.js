import { useState, useEffect } from 'react';
import { throttle } from '../utils/helpers';

/**
 * Custom hook to track scroll position
 * @param {number} threshold - Scroll threshold to trigger state change
 * @returns {boolean} - Whether scroll position is past threshold
 */
export const useScrollPosition = (threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > threshold);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};