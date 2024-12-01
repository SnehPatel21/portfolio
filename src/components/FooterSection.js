import styles from '../styles/Footer.module.css';
import { Mail, Instagram, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.copyright}>
          Copyright © <span className={styles.highlight}>Sneh Patel</span> Theme - Powered by <span className={styles.highlight}>Sneh Patel</span>
        </div>
        
        <div className={styles.socialLinks}>
          <a href="mailto:your-email@example.com" aria-label="Email" className={styles.socialLink}>
            <Mail size={20} />
          </a>
          <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
            <Instagram size={20} />
          </a>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialLink}>
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;