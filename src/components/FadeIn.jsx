import { useEffect, useRef, useState } from 'react';

/**
 * FadeIn Component
 * Komponen untuk animasi fade in saat elemen masuk viewport
 * 
 * Props:
 * - children: Konten yang akan dianimasi
 * - delay: Delay animasi dalam ms (default: 0)
 * - duration: Durasi animasi dalam ms (default: 600)
 * - className: Class tambahan
 */
const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 600,
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animation setelah delay
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            // Unobserve setelah visible untuk performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger ketika 10% elemen terlihat
        rootMargin: '50px' // Trigger 50px sebelum elemen masuk viewport
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
