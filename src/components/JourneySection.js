import styles from '../styles/JourneySection.module.css';

const JourneySection = () => {
  return (
    <section className={styles.journeySection}>
      <div className={styles.headingContainer}>
        <h2 className={styles.heading}>
          Quality is<br />
          no accident
        </h2>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.imageContainer}>
          <img 
            src="/assets/cat.jpeg" 
            alt="Journey visualization" 
            className={styles.journeyImage}
          />
        </div>
        
        <div className={styles.textContainer}>
          <div className={styles.quotes}>
            <img 
              src="/assets/Quotes.png" 
              alt="Opening quote" 
              className={styles.quoteStart}
            />
            <p className={styles.content}>
              What started as curiosity about web development has evolved into a passion 
              for creating impactful digital solutions. Through continuous learning and 
              hands-on experience, I've developed a comprehensive understanding of modern 
              web technologies and best practices.
            </p>
            <p className={styles.content}>
              My journey in tech has taught me that great software is built through 
              careful planning, continuous iteration, and unwavering attention to detail. 
              Each project is an opportunity to push boundaries and create something meaningful.
            </p>
            <img 
              src="/assets/Quotes.png" 
              alt="Closing quote" 
              className={styles.quoteEnd}
            />
          </div>

          <div className={styles.authorInfo}>
            <p className={styles.authorName}>Sneh Patel</p>
            <p className={styles.authorRole}>Full Stack Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;