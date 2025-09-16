// src/Section.js

import React, { useEffect, useRef, useState } from 'react';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string; // For background colors, etc.
  style?: React.CSSProperties;
}

export const Section: React.FC<SectionProps> = ({ id, children, className, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 } // A lower threshold can feel more responsive
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    // Outer div: Handles background, animation, and vertical padding
    <section
      id={id}
      ref={ref}
      style={style}
      className={`
        w-full py-20 sm:py-24 
        transform transition-all duration-700 ease-in-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        ${className || ''}
      `}
    >
      {/* Inner div: Constrains content width and handles horizontal padding */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};