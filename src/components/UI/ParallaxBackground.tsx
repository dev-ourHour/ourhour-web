import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ 
  children, 
  className = '',
  intensity = 0.5 
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800"
        style={{
          transform: `translateY(${scrollY * intensity}px)`,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground;