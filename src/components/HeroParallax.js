import { Parallax, ParallaxLayer } from '@react-spring/parallax';

const HeroParallax = () => (
  <Parallax pages={2}>
    <ParallaxLayer offset={0} speed={0.5}>
      <div className="stars-background" />
    </ParallaxLayer>
    <ParallaxLayer offset={1} speed={0.8}>
      <div className="hero-content">
        <h1>Your Heading Here</h1>
      </div>
    </ParallaxLayer>
  </Parallax>
);

export default HeroParallax;
