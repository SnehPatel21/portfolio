import styles from '../styles/ProjectSection.module.css';
import { SectionWrapper } from '../layout/SectionWrapper';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "Website - 1",
      description: "This website is about 2d art and visuals which is used in daily life.",
      image: "/assets/cat.jpeg"
    },
    {
      id: 2,
      title: "Website - 1",
      description: "This website is about 2d art and visuals which is used in daily life.",
      image: "/assets/cat.jpeg"
    }
  ];

  return (
    <SectionWrapper>
    <section className={styles.projectsSection}>
      <div className={styles.sparkleContainer}>
        <img src="/assets/Sparkle.png" alt="" className={styles.sparkleTop} />
        <img src="/assets/Sparkle.png" alt="" className={styles.sparkleRight} />
        <img src="/assets/Sparkle.png" alt="" className={styles.sparkleLeft} />
      </div>

      <h2 className={styles.heading}>
        Check out some<br />
        of our great<br />
        productions..
      </h2>

      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.imageContainer}>
              <img 
                src={project.image} 
                alt={project.title}
                className={styles.projectImage}
              />
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </SectionWrapper>
  );
};

export default ProjectsSection;