"use client";

import ProjectsSection from '@/components/ProjectsSection';
import HeroSection from '../components/HeroSection';
import ProcessSection from '../components/ProcessSection';
import SkillsSection from '../components/SkillsSection';
import JourneySection from '@/components/JourneySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/FooterSection';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed Hero Section */}
      <div className="fixed inset-0 z-0">
        <HeroSection />
      </div>
      
      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Transparent spacer to allow scrolling past hero */}
        <div className="h-screen w-full bg-transparent" />
        
        {/* Main content */}
        <div className="relative">
          <SkillsSection />
          <ProjectsSection />
          <ProcessSection />
          <JourneySection/>
          <ContactSection/>
        </div>

        {/* Footer */}
        <Footer/>
      </div>
    </div>
  );
}