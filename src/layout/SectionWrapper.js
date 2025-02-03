import styles from '../styles/SectionWrapper.module.css';

export const SectionWrapper = ({ children, className = '', fullWidth = false }) => {
  return (
    <section className={`${styles.section} ${className}`}>
      <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''}`}>
        {children}
      </div>
    </section>
  );
};