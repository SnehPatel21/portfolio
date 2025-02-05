import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device has mouse
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);
      
      const moveCursor = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };

      const handleMouseEnter = (e) => {
        if (!e.target) return;
        
        const isClickable = e.target.matches('a, button, [role="button"], input, select, textarea') ||
                          e.target.closest('a, button, [role="button"]') ||
                          e.target.classList.contains('clickable');
                          
        setIsHovered(isClickable);
      };

      const handleMouseLeave = () => {
        setIsHovered(false);
      };

      document.addEventListener('mousemove', moveCursor);
      document.addEventListener('mouseover', handleMouseEnter);
      document.addEventListener('mouseout', handleMouseLeave);

      // Hide default cursor
      document.documentElement.style.cursor = 'none';
      
      return () => {
        document.removeEventListener('mousemove', moveCursor);
        document.removeEventListener('mouseover', handleMouseEnter);
        document.removeEventListener('mouseout', handleMouseLeave);
        document.documentElement.style.cursor = 'auto';
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovered ? 1.5 : 1
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.15,
          scale: {
            type: "spring",
            damping: 25,
            stiffness: 300,
          }
        }}
      >
        {/* Center dot */}
        <div className="w-2 h-2 bg-[#FFD580] rounded-full" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: isHovered ? 1.5 : 1
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.3,
          scale: {
            type: "spring",
            damping: 25,
            stiffness: 200,
          }
        }}
      >
        <div className="relative">
          {/* Ring */}
          <div className="w-6 h-6 border border-[#FFD580] rounded-full opacity-60" />
          
          {/* Subtle glow */}
          <div 
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, #FFD580 0%, transparent 70%)',
            }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;