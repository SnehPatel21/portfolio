"use client"; // Make this a client-side component

import FadeInSection from '../animations/FadeIn';

const projects = [
  { title: "Project 1", description: "A great project", link: "#" },
  { title: "Project 2", description: "Another awesome project", link: "#" },
  // Add more projects
];

export default function ProjectsSection() {
  return (
    <section className="projects-section">
      <div className="container">
        <FadeInSection>
          <h2>Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div className="project-card" key={index}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.link} className="project-link">View Project</a>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
