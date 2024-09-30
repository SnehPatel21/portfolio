"use client"; // Make this a client-side component

import FadeInSection from '../animations/FadeIn';

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="container">
        <FadeInSection>
          <h2>About Me</h2>
          <p>
            I’m a passionate developer focused on building interactive and responsive front-end
            applications using React, Three.js, and modern web technologies.
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
