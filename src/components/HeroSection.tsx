import { Button } from '@/components/ui/button';
import { ArrowRight, Play, GraduationCap, Atom, FlaskConical, Users } from 'lucide-react';

export const HeroSection = () => {

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      
      {/* Floating Scientific Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Atomic structures */}
        <div className="absolute top-[20%] left-[15%] w-8 h-8 opacity-20">
          <div className="w-full h-full border-2 border-primary rounded-full relative animate-spin" style={{animationDuration: '20s'}}>
            <div className="absolute top-1 left-1/2 w-1 h-1 bg-secondary rounded-full transform -translate-x-1/2 animate-pulse"></div>
            <div className="absolute bottom-1 right-1/2 w-1 h-1 bg-accent rounded-full transform translate-x-1/2 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>

        {/* DNA double helix */}
        <div className="absolute top-[60%] right-[20%] w-4 h-16 opacity-15">
          <div className="relative w-full h-full">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full animate-pulse"></div>
            <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-secondary to-primary rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
        </div>

        {/* Molecular bonds - floating geometric science shapes */}
        <div className="absolute top-[35%] left-[70%] w-6 h-6 opacity-25 animate-float" style={{animationDelay: '2s'}}>
          <div className="w-full h-full relative">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-secondary rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-accent rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-4 bg-primary/50 rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
          </div>
        </div>

        {/* Scientific formulas as floating text */}
        <div className="absolute top-[25%] right-[35%] text-primary/20 font-playfair text-lg font-bold italic animate-pulse" style={{animationDelay: '3s'}}>
          E=mc²
        </div>
        
        <div className="absolute bottom-[35%] left-[25%] text-secondary/20 font-playfair text-base font-bold italic animate-pulse" style={{animationDelay: '4s'}}>
          F=ma
        </div>

        <div className="absolute top-[45%] left-[80%] text-accent/20 font-playfair text-lg font-bold italic animate-pulse" style={{animationDelay: '5s'}}>
          H₂O
        </div>

        {/* Constellation pattern */}
        <div className="absolute bottom-[25%] right-[15%] w-12 h-8 opacity-30">
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 w-1 h-1 bg-primary rounded-full animate-twinkle"></div>
            <div className="absolute top-2 right-2 w-1 h-1 bg-secondary rounded-full animate-twinkle" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-0 left-4 w-1 h-1 bg-accent rounded-full animate-twinkle" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-1 right-0 w-1 h-1 bg-primary rounded-full animate-twinkle" style={{animationDelay: '0.5s'}}></div>
            <svg className="absolute inset-0 w-full h-full opacity-40">
              <path d="M0,0 L32,8 L16,32 L48,24" stroke="hsl(var(--primary))" strokeWidth="0.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Laboratory equipment silhouettes */}
        <div className="absolute top-[55%] left-[10%] w-6 h-8 opacity-15 animate-float" style={{animationDelay: '6s'}}>
          <div className="w-full h-full relative">
            {/* Beaker shape */}
            <div className="absolute bottom-0 left-1/2 w-4 h-6 bg-gradient-to-t from-primary/30 to-transparent rounded-b-full transform -translate-x-1/2"></div>
            <div className="absolute top-2 left-1/2 w-2 h-1 bg-primary/50 rounded transform -translate-x-1/2"></div>
          </div>
        </div>

        {/* Periodic table element */}
        <div className="absolute bottom-[45%] right-[60%] w-8 h-8 border border-accent/20 opacity-25 animate-pulse" style={{animationDelay: '7s'}}>
          <div className="flex flex-col items-center justify-center h-full text-accent/40 font-mono">
            <div className="text-xs font-bold">He</div>
            <div className="text-[0.5rem]">2</div>
          </div>
        </div>
      </div>
<div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-glass backdrop-blur-sm border border-glass-border rounded-full px-6 py-2 mb-8 cursor-pointer hover:bg-glass/80 transition-colors" onClick={() => window.open('https://mmodel.edu.bd', '_blank')}>
            <img src="/lovable-uploads/40b92813-5470-4ed5-aef2-a658366074ce.png" alt="MMSC Logo" className="w-5 h-5 rounded-full" />
            <span className="text-sm font-medium">Motijheel Model School and College</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Explore the Universe
            </span>
            <br />
            <span className="text-foreground">Through Science</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Welcome to the <strong className="text-primary">Motijheel Model School and College Science Club</strong> – 
            where physics meets chemistry, and curiosity drives discovery.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-2 mx-auto">
                <Atom className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Experiments</div>
            </div>
            <div className="text-center animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-secondary rounded-full mb-2 mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-secondary">30+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center animate-slide-up" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-accent rounded-full mb-2 mx-auto">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-accent">5+</div>
              <div className="text-sm text-muted-foreground">Expert Teachers</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{animationDelay: '0.8s'}}>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 border-0"
              onClick={() => document.querySelector('#join')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Join Our Club
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-glass-border bg-glass backdrop-blur-sm hover:bg-gradient-card hover:shadow-card transition-all duration-300"
              onClick={() => document.querySelector('#simulations')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="w-5 h-5 mr-2" />
              Explore Simulations
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};