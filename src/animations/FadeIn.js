// src/animations/FadeIn.js
"use client";
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const FadeInSection = ({ children }) => (
  <motion.div initial="hidden" animate="visible" variants={fadeIn}>
    {children}
  </motion.div>
);

export default FadeInSection;
