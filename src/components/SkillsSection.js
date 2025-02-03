import styles from '../styles/SkillsSection.module.css';
import { SectionWrapper } from '../layout/SectionWrapper';

const SkillsSection = () => {
  return (
    <SectionWrapper>
    <section className={styles.skillsSection}>
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <img 
            src="/assets/startrail.png" 
            alt="Star trail decoration" 
            className={styles.starTrail}
            width="180"
            height="60"
          />
          <h2 className={styles.heading}>We offer a wide variety of skills</h2>
        </div>
        
        <div className={styles.skillsGrid}>
          <div className={styles.skillCard}>
            <span className={styles.cardIcon}>✎</span>
            <h3>Web Development</h3>
            <div className={styles.skillContent}>
              <h4>Technologies & Tools:</h4>
              <p>HTML, CSS, JavaScript, React, Next.js, Node.js, Express, MERN Stack, Bootstrap, Tailwind CSS, Figma</p>
              <p>Expertise in creating responsive and dynamic websites using modern web development frameworks and design tools.</p>
            </div>
          </div>

          <div className={styles.skillCard}>
            <span className={styles.cardIcon}>📱</span>
            <h3>App Development</h3>
            <div className={styles.skillContent}>
              <h4>Technologies & Tools:</h4>
              <p>Flutter, Dart, React Native, Android Studio, Supabase</p>
              <p>Skilled in developing mobile applications for Android and iOS platforms.</p>
            </div>
          </div>

          <div className={styles.skillCard}>
            <span className={styles.cardIcon}>🎨</span>
            <h3>Graphic Design</h3>
            <div className={styles.skillContent}>
              <h4>Technologies & Tools:</h4>
              <p>Figma, Adobe XD</p>
              <p>Adept in designing clean, functional, and visually appealing user interfaces.</p>
            </div>
          </div>

          <div className={styles.skillCard}>
            <span className={styles.cardIcon}>☁️</span>
            <h3>Cloud & Backend Services</h3>
            <div className={styles.skillContent}>
              <h4>Technologies & Tools:</h4>
              <p>AWS, Firebase, Postgres, MongoDB, Supabase</p>
              <p>Proficient in leveraging cloud services and databases for robust, scalable, and secure backend systems.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </SectionWrapper>
  );
};

export default SkillsSection;