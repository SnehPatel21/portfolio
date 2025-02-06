'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const DynamicScrollbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const smoothProgress = useSpring(0, { 
    stiffness: 100, 
    damping: 30 
  });

  useEffect(() => {
    let rafId;
    let timeoutId;

    const updateScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const max = docHeight - winHeight;
      const progress = Math.min(Math.max(scrolled / max, 0), 1);

      setScrollProgress(progress);
      smoothProgress.set(progress);
      setIsScrolling(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsScrolling(false), 150);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed right-6 w-20 pointer-events-none" style={{ top: '5%', height: '90%' }}>
      {/* Track */}
      <div className="absolute right-9 h-full w-3">
        {/* Track Container */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Border */}
          <div 
            className="absolute -inset-[1px] rounded-full"
            style={{
              background: 'linear-gradient(90deg, #8B0FF9 0%, #B818F4 100%)',
              opacity: 0.5
            }}
          />
          
          {/* Glass Background */}
          <div 
            className="absolute inset-[1px] rounded-full"
            style={{
              background: 'linear-gradient(90deg, rgba(139,15,249,0.3) 0%, rgba(184,24,244,0.05) 50%, rgba(139,15,249,0.3) 100%)',
              backdropFilter: 'blur(8px)',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        {/* Mask for trail containment */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Scrollbar Container */}
          <motion.div
            className="absolute inset-x-0"
            style={{
              top: `${scrollProgress * 100}%`,
              transform: 'translateY(-50%)'
            }}
          >
            {/* Trail Container */}
            <div 
              className="absolute w-full overflow-hidden rounded-full"
              style={{
                bottom: '1.5px', // Aligns with orb
                height: '120px',
                width: '12px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              {/* Base Trail */}
              <div 
                className="absolute bottom-0 w-full rounded-t-lg"
                style={{
                  height: '100%',
                  background: 'linear-gradient(to top, #FFD580, transparent)',
                  opacity: isScrolling ? 0.8 : 0.6,
                  filter: 'blur(0.5px)'
                }}
              />

              {/* Animated Trail Overlay */}
              <motion.div
                className="absolute bottom-0 w-full rounded-t-lg"
                style={{
                  height: '100%',
                  background: 'linear-gradient(to top, #FFD580 10%, transparent)',
                  opacity: 0.3,
                  mixBlendMode: 'soft-light',
                  filter: 'blur(0.5px)'
                }}
                animate={{
                  y: [-10, 0, -10]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>

            {/* Orb */}
            <div 
              className="absolute"
              style={{
                width: '12px',
                height: '12px',
                left: '50%',
                bottom: 0,
                transform: 'translateX(-50%)'
              }}
            >
              {/* Core Glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: isScrolling ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{
                  background: 'radial-gradient(circle at center, #FFD580 10%, rgba(255, 213, 128, 0.8) 30%, transparent 70%)',
                  boxShadow: `
                    0 0 10px #FFD580,
                    0 0 20px #FFD580,
                    0 0 30px rgba(255, 213, 128, 0.8)
                  `
                }}
              />

              {/* Inner Core */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at center, white 0%, #FFD580 50%, transparent 100%)',
                  filter: 'blur(0.5px)'
                }}
              />

              {/* Outer Glow */}
              <motion.div
                className="absolute -inset-1 rounded-full"
                animate={{
                  scale: isScrolling ? [1.2, 1.5, 1.2] : [1.1, 1.3, 1.1],
                  opacity: isScrolling ? [0.5, 0.2, 0.5] : [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 213, 128, 0.5) 0%, transparent 70%)',
                  filter: 'blur(1px)'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DynamicScrollbar;