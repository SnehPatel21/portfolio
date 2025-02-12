"use client"; // Make this a client-side component

import ProjectsSection from '@/components/ProjectsSection';
import HeroSection from '../components/HeroSection';
import ProcessSection from '../components/ProcessSection';
import SkillsSection from '../components/SkillsSection';
import JourneySection from '@/components/JourneySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/FooterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ProcessSection />
      <JourneySection/>
      <ContactSection/>
      <Footer/>
    </>
  );
}
