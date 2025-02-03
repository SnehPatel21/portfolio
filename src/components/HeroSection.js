import styles from '../styles/HeroSection.module.css';
import Image from 'next/image';
import ellipse1 from '/public/assets/Ellipse 1.png';
import ellipse2 from '/public/assets/Ellipse 2.png';
import heroImage from '/public/assets/cat.jpeg';

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      {/* Background Elements - Now properly positioned */}
      {/* <div className={styles.backgroundElements}>
        <div className={styles.ellipse1Wrapper}>
          <Image 
            src={ellipse1} 
            alt=""
            className={styles.ellipse1}
            priority
            fill
          />
        </div>
        <div className={styles.ellipse2Wrapper}>
          <Image 
            src={ellipse2} 
            alt=""
            className={styles.ellipse2}
            fill
          />
        </div>
      </div> */}

      {/* Main Content Container */}
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.content}>
          <h1 className={styles.logo}>&lt;/Scorpion&gt;</h1>
          <p className={styles.subText}>Welcome to &lt;/scorpion&gt;</p>
          <h2 className={styles.tagline}>
            We are destined<br />
            for success in the<br />
            business world
          </h2>
          <p className={styles.subText}>Know more about us by clicking below</p>
          <button className={styles.ctaButton}>Get Started</button>
        </div>

        {/* Right Content */}
        <div className={styles.sidebar}>
          {/* Navigation */}
          <nav className={styles.nav}>
            <a href="#about">About</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
          
          {/* Image Container */}
          <div className={styles.imageWrapper}>
            <Image 
              src={heroImage} 
              alt="Hero illustration"
              className={styles.heroImage}
              priority
              fill
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;