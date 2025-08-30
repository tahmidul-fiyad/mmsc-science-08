import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SimulationSection } from '@/components/SimulationSection';
import { NoticeBoard } from '@/components/NoticeBoard';
import { MembershipForm } from '@/components/MembershipForm';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { ParticleSystem } from '@/components/ParticleSystem';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Animated Particle Background */}
      <ParticleSystem />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SimulationSection />
        <NoticeBoard />
        <MembershipForm />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
