import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ 
  count = 8, 
  className = '' 
}) => {
  const elements = Array.from({ length: count }, (_, i) => i);
  
  const shapes = ['circle', 'square', 'triangle', 'diamond', 'star'];
  const colors = [
    'bg-primary-500/10',
    'bg-secondary-500/10',
    'bg-accent-500/10',
    'bg-pink-500/10',
    'bg-cyan-500/10',
    'bg-emerald-500/10',
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((i) => {
        const shape = shapes[i % shapes.length];
        const color = colors[i % colors.length];
        const size = Math.random() * 60 + 20;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className={`absolute ${color} ${
              shape === 'circle' ? 'rounded-full' :
              shape === 'square' ? 'rounded-lg' :
              shape === 'triangle' ? 'rounded-sm rotate-45' :
              shape === 'diamond' ? 'rounded-lg rotate-45' :
              'rounded-full'
            } backdrop-blur-sm`}
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [0, 360],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingElements;