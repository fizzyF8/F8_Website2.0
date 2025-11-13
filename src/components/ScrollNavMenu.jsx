import { useState, useEffect } from 'react';

export default function ScrollNavMenu({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the CTA buttons in the hero section
      const heroCta = document.querySelector('.hero-cta');
      const footer = document.querySelector('.footer');
      
      // Check if footer is in view
      let footerInView = false;
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        // Footer is in view if its top is above the bottom of viewport
        footerInView = footerRect.top < window.innerHeight;
      }
      
      // If footer is in view, hide navigation
      if (footerInView) {
        setIsVisible(false);
        return;
      }
      
      if (!heroCta) {
        // If no CTA buttons found, try to find hero section as fallback
        const heroSection = document.querySelector('.hero-section-fullpage');
        if (!heroSection) {
          setIsVisible(true);
          return;
        }
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollY = window.scrollY;
        if (scrollY >= heroBottom) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
        return;
      }

      // Get the position of the CTA buttons relative to viewport
      const ctaRect = heroCta.getBoundingClientRect();
      
      // Show navigation when the CTA buttons have scrolled past the bottom of viewport
      // ctaRect.bottom < 0 means the buttons are completely above the viewport
      // Adding a small threshold (50px) to ensure smooth transition
      if (ctaRect.bottom < -50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check on mount
    handleScroll();

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div 
      className={`scroll-nav-menu ${isVisible ? 'scroll-nav-menu--visible' : 'scroll-nav-menu--hidden'}`}
    >
      {children}
    </div>
  );
}

