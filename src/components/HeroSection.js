import Image from 'next/image';
import styles from '../styles/HeroSection.module.css';
import ellipse1 from '/public/assets/Ellipse 1.png'; // Update with the correct path
import ellipse2 from '/public/assets/Ellipse 2.png';
import heroImage from '/public/assets/cat.jpeg'; // Update with your image

const HeroSection = () => {
    return (
      <section className={styles.heroSection}>
        {/* Ellipse 1 and Mesh Gradient in the Background */}
        <Image src={ellipse1} alt="Ellipse 1" className={styles.ellipse1} />
        <Image src={ellipse2} alt="Ellipse 2" className={styles.ellipse2} />
  
        {/* Hero Section Base */}
        <div className={styles.rectangle1}>
          {/* Left Section (Text and Button) */}
          <div className={styles.heroContent}>
            <h1 className={styles.logo}>&lt;/Scorpion&gt;</h1>
            <p className={styles.subText}>Welcome to &lt;/scorpion&gt;</p>
            <h2 className={styles.tagline}>We are destined for success in the business world</h2>
            <p className={styles.subText}>Know more about us by clicking below</p>
            <button className={styles.ctaButton}>Get Started</button>
          </div>
  
          {/* Right Section (Menu and Hero Image) */}
          <div className={styles.rightRectangle}>
            <nav className={styles.menu}>
              <a href="#">About</a>
              <a href="#">Portfolio</a>
              <a href="#">Services</a>
              <a href="#">Contact</a>
            </nav>
            <Image src={heroImage} alt="Hero Image" className={styles.heroImage} />
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;