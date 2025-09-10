import React, { useEffect, useRef, useState } from 'react';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; // ✅ Add this line
}

export const Section: React.FC<SectionProps> = ({ id, children, className, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      className={`
        transform transition-all duration-700 ease-out
        ${visible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-12'}
        ${className}
      `}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: '4rem',
        paddingBottom: '4rem',
        ...(style || {})
      }}
    >
      {children}
    </div>
  );
};
