"use client"; // Make this a client-side component

import ProjectsSection from '@/components/ProjectsSection';
import HeroSection from '../components/HeroSection';
import ProcessSection from '../components/ProcessSection';
import SkillsSection from '../components/SkillsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProcessSection />
      {/* <ProjectsSection /> */}
      <SkillsSection />
    </>
  );
}
