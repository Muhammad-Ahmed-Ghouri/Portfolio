import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero-section";
import About from "@/components/About";
import SkillsSection from "@/components/Skillssection";
import ContactSection from "@/components/ContactSection";
import ProjectsSection from "@/components/Projects/ProjectSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <About />
      <SkillsSection/>
      <ProjectsSection />
      <ContactSection/>
    </main>
  );
}