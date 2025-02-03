import styles from '../styles/ProcessSection.module.css';
import { SectionWrapper } from '../layout/SectionWrapper';
import { FaPen, FaCode, FaRocket, FaClipboardList } from 'react-icons/fa'; // Icons for visuals

const ProcessSection = () => {
  return (
    <SectionWrapper>
    <section className={styles.section}>
      <h2 className={styles.heading}>Our Development Process</h2>
      <div className={styles.cardsContainer}>
        {/* Card 1 */}
        <div className={styles.card}>
          <FaClipboardList className={styles.icon} />
          <h3 className={styles.cardTitle}>Discovery & Planning</h3>
          <p className={styles.cardText}>
            We start by identifying your goals, target audience, and key performance indicators (KPIs) to set a solid foundation for the project.
          </p>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <FaPen className={styles.icon} />
          <h3 className={styles.cardTitle}>Design & Prototyping</h3>
          <p className={styles.cardText}>
            Our design team crafts visually appealing and user-friendly prototypes based on your requirements, using modern design tools and trends.
          </p>
        </div>

        {/* Card 3 */}
        <div className={styles.card}>
          <FaCode className={styles.icon} />
          <h3 className={styles.cardTitle}>Development & Testing</h3>
          <p className={styles.cardText}>
            With a strong focus on clean code, we build the website or app, rigorously testing each feature to ensure it functions seamlessly.
          </p>
        </div>

        {/* Card 4 */}
        <div className={styles.card}>
          <FaRocket className={styles.icon} />
          <h3 className={styles.cardTitle}>Launch & Optimization</h3>
          <p className={styles.cardText}>
            After launching, we continually monitor and optimize your platform for performance, ensuring it remains functional and up-to-date.
          </p>
        </div>
      </div>
    </section>
    </SectionWrapper>
  );
};

export default ProcessSection;
