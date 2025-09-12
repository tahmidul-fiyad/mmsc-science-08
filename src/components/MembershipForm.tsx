import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, GraduationCap, ExternalLink } from 'lucide-react';

export const MembershipForm = () => {
  const handleJoinClick = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSf6pxcRonY9W93pZ_FeAqvJrLFa7vqUXaO7067uC3MdqqMXSg/viewform?usp=header', '_blank');
  };

  return (
    <section id="join" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-bl from-background via-background/90 to-background"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-glass backdrop-blur-sm border border-glass-border rounded-full px-6 py-2 mb-6">
              <UserPlus className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Join Our Community</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Become a <span className="bg-gradient-accent bg-clip-text text-transparent">Member</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the Motijheel Model School and College Science Club and embark on an exciting journey of scientific discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Benefits Card */}
            <div className="lg:col-span-1 animate-slide-up">
              <Card className="bg-gradient-primary border-0 p-6 text-white h-fit">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Member Benefits
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Access to advanced laboratory equipment
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Participate in national competitions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Interactive simulations and experiments
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Mentorship from experienced teachers
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Certificate of participation
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Networking with science enthusiasts
                  </li>
                </ul>
              </Card>
            </div>

            {/* Join Button */}
            <div className="lg:col-span-2 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <Card className="bg-gradient-card border-glass-border backdrop-blur-sm p-8 shadow-card text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="text-2xl font-semibold mb-4">Ready to Join?</h3>
                  <p className="text-muted-foreground mb-8">
                    Click the button below to fill out our membership form and start your journey with us.
                  </p>
                  
                  <Button 
                    onClick={handleJoinClick}
                    size="lg" 
                    className="w-full bg-gradient-accent hover:shadow-glow transition-all duration-300"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Fill Membership Form
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};