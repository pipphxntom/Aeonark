import { useEffect, useRef } from 'react';

interface TwinklingStarsProps {
  className?: string;
}

export default function TwinklingStars({ className = "" }: TwinklingStarsProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create stars
    const numberOfStars = 50;
    const stars: HTMLDivElement[] = [];

    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.className = 'twinkling-star';
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 3 + 1;
      
      // Random animation delay
      const delay = Math.random() * 4;
      
      // Random animation duration
      const duration = Math.random() * 3 + 2;
      
      star.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
        background: white;
        border-radius: 50%;
        animation: twinkle ${duration}s ease-in-out ${delay}s infinite;
        opacity: 0;
      `;
      
      stars.push(star);
      mountRef.current.appendChild(star);
    }

    // Add CSS keyframes for twinkling
    const style = document.createElement('style');
    style.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      if (mountRef.current) {
        stars.forEach(star => {
          if (mountRef.current?.contains(star)) {
            mountRef.current.removeChild(star);
          }
        });
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}