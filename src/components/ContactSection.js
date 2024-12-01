import styles from '../styles/ContactSection.module.css';

const ContactSection = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.mainContainer}>
        <div className={styles.sparkleTop}>
          <img src="/assets/Sparkle.png" alt="Decorative sparkle" />
        </div>
        
        <div className={styles.contentWrapper}>
          <div className={styles.leftContent}>
            <h2 className={styles.heading}>
              Let's<br />
              Build<br />
              something<br />
              <span className={styles.highlight}>great!</span>
            </h2>
          </div>

          <div className={styles.rightContent}>
            <p className={styles.description}>
              Let's work together to create something amazing and bring your vision to life!
            </p>
            <button className={styles.contactButton}>Contact Us</button>
          </div>
        </div>

        <div className={styles.sparkleBottom}>
          <img src="/assets/Sparkle.png" alt="Decorative sparkle" />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;