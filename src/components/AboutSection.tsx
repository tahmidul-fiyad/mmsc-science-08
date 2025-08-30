import { Card } from '@/components/ui/card';
import { Atom, FlaskConical, Microscope, Rocket, Users, Trophy } from 'lucide-react';

export const AboutSection = () => {
  const features = [
    {
      icon: Atom,
      title: 'Physics',
      description: 'Learn physics with our expert teachers and practicals',
      gradient: 'bg-gradient-primary'
    },
    {
      icon: FlaskConical,
      title: 'Chemistry Lab',
      description: 'Conduct real chemistry experiments, analyze molecular structures, and discover the building blocks of matter.',
      gradient: 'bg-gradient-secondary'
    },
    {
      icon: Microscope,
      title: 'Research Projects',
      description: 'Participate in groundbreaking research projects and contribute to scientific discoveries.',
      gradient: 'bg-gradient-accent'
    },
    {
      icon: Rocket,
      title: 'Innovation Hub',
      description: 'Learn chemical reactions and practical in our Lab',
      gradient: 'bg-gradient-primary'
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Work with passionate peers, share knowledge, and learn from expert mentors.',
      gradient: 'bg-gradient-secondary'
    },
    {
      icon: Trophy,
      title: 'Competitions',
      description: 'Compete in national and international science olympiads and research competitions.',
      gradient: 'bg-gradient-accent'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            About Our <span className="bg-gradient-primary bg-clip-text text-transparent">Science Club</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Founded at <strong className="text-primary">Motijheel Model School and College</strong>, our science club is a 
            premier community dedicated to advancing scientific knowledge through hands-on learning, research, and innovation.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-16 animate-slide-up">
          <Card className="bg-gradient-card border-glass-border backdrop-blur-sm p-8 shadow-card">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
                Our Mission
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To inspire the next generation of scientists by providing an immersive environment where 
                students can explore the fascinating worlds of <strong className="text-primary">Physics</strong> and 
                <strong className="text-secondary"> Chemistry</strong> through cutting-edge technology, 
                interactive simulations, and collaborative research.
              </p>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className="animate-slide-up" 
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <Card className="bg-gradient-card border-glass-border backdrop-blur-sm p-6 hover:shadow-glow transition-all duration-500 hover:-translate-y-2 group">
                  <div className="mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.gradient} rounded-lg shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 animate-scale-in">
          <Card className="bg-gradient-hero border-glass-border backdrop-blur-sm p-8 shadow-elegant">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  1+
                </div>
                <div className="text-muted-foreground">Years of Excellence</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-secondary bg-clip-text text-transparent mb-2">
                  30+
                </div>
                <div className="text-muted-foreground">Active Members</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <div className="text-muted-foreground">Experiments Conducted</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  10+
                </div>
                <div className="text-muted-foreground">Scientific Experts</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};