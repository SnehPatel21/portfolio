import styles from '../styles/HeroSection.module.css';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HeroSection = () => {
  const { scrollY } = useScroll();
  
  // Create smooth transform effects based on scroll
  const scale = useTransform(scrollY, [0, 500], [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const imageScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <div className={styles.heroSection}>
      <motion.div 
        className={styles.container}
        style={{ 
          scale,
          opacity,
        }}
      >
        {/* Left Content */}
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className={styles.logo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            &lt;/Scorpion&gt;
          </motion.h1>
          
          <motion.p 
            className={styles.subText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to &lt;/scorpion&gt;
          </motion.p>
          
          <motion.h2 
            className={styles.tagline}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            We are destined<br />
            for success in the<br />
            business world
          </motion.h2>
          
          <motion.p 
            className={styles.subText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Know more about us by clicking below
          </motion.p>
          
          <motion.button 
            className={styles.ctaButton}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Right Content */}
        <motion.div 
          className={styles.sidebar}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Navigation */}
          <nav className={styles.nav}>
            {['about', 'portfolio', 'services', 'contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                whileHover={{ scale: 1.1, color: '#9d3ffb' }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.a>
            ))}
          </nav>
          
          {/* Image Container */}
          <motion.div 
            className={styles.imageWrapper}
            style={{ scale: imageScale }}
          >
            <Image 
              src="/assets/cat.jpeg"
              alt="Hero illustration"
              className={styles.heroImage}
              priority
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full p-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce mx-auto" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;