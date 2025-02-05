'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

const DynamicScrollbar = () => {
  const [scrollInfo, setScrollInfo] = useState({ progress: 0, max: 1 });
  const [isScrolling, setIsScrolling] = useState(false);
  const smoothProgress = useSpring(0, {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  });

  const calculateScroll = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollableHeight = docHeight - winHeight;
    const currentScroll = window.scrollY;
    
    // Calculate progress ensuring orb stays within bounds
    const rawProgress = currentScroll / scrollableHeight;
    const adjustedProgress = Math.min(Math.max(rawProgress, 0), 0.995);
    
    return {
      progress: adjustedProgress,
      max: scrollableHeight
    };
  }, []);

  useEffect(() => {
    let animationFrame;
    let timeoutId;

    const updateScroll = () => {
      const newScrollInfo = calculateScroll();
      setScrollInfo(newScrollInfo);
      smoothProgress.set(newScrollInfo.progress);
      setIsScrolling(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsScrolling(false), 150);
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrame);
    };
  }, [calculateScroll, smoothProgress]);

  return (
    <div className="fixed inset-y-0 right-6 w-20 pointer-events-none">
      {/* Track */}
      <div className="absolute right-9 top-[2%] bottom-[2%] w-3">
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Border glow */}
          <div 
            className="absolute -inset-[1px] rounded-full"
            style={{
              background: 'linear-gradient(90deg, #8B0FF9 0%, #B818F4 100%)',
              opacity: 0.5
            }}
          />
          
          {/* Glass track */}
          <div 
            className="absolute inset-[1px] rounded-full"
            style={{
              background: 'linear-gradient(90deg, rgba(139,15,249,0.3) 0%, rgba(184,24,244,0.05) 50%, rgba(139,15,249,0.3) 100%)',
              backdropFilter: 'blur(8px)',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        {/* Scrollbar */}
        <motion.div
          className="absolute left-0 right-0"
          style={{
            top: `${scrollInfo.progress * 96}%`,
            y: '-50%'
          }}
        >
          {/* Trail */}
          <motion.div
            className="absolute left-0 right-0"
            style={{
              height: '120px',
              bottom: '10px',
              transformOrigin: 'center bottom',
              opacity: isScrolling ? 1 : 0.7,
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, #FFD580, transparent)',
                opacity: 1
              }}
            />
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ['0% -100%', '0% 200%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                backgroundImage: 'linear-gradient(to top, #FFD580 30%, transparent)',
                backgroundSize: '100% 200%'
              }}
            />
          </motion.div>

          {/* Orb */}
          <div className="absolute inset-x-0 h-3">
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: isScrolling ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                background: 'radial-gradient(circle at center, #FFD580 30%, transparent 70%)',
                boxShadow: `
                  0 0 10px #FFD580,
                  0 0 20px #FFD580,
                  0 0 30px rgba(255,213,128,0.4)
                `
              }}
            />

            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: isScrolling ? [1.2, 1.8, 1.2] : [1.1, 1.3, 1.1],
                opacity: isScrolling ? [0.3, 0, 0.3] : [0.2, 0, 0.2]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                background: 'radial-gradient(circle at center, #FFD580 30%, transparent 70%)'
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicScrollbar;