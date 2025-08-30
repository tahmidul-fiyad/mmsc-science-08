import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Users, Award } from 'lucide-react';

export const ContactSection = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      details: ['Motijheel Model School and College', 'Motijheel, Dhaka-1000', 'Bangladesh'],
      gradient: 'bg-gradient-primary'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+880-2-9563427', '+880-2-9563428', 'Extension: 101 (Science Dept.)'],
      gradient: 'bg-gradient-secondary'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['scienceclub@mmsc.edu.bd', 'info@mmsc.edu.bd', 'physics.chemistry@mmsc.edu.bd'],
      gradient: 'bg-gradient-accent'
    },
    {
      icon: Clock,
      title: 'Club Hours',
      details: ['Monday - Friday: 3:00 PM - 5:00 PM', 'Saturday: 10:00 AM - 12:00 PM', 'Sunday: Closed'],
      gradient: 'bg-gradient-primary'
    }
  ];

  const facultyMembers = [
    {
      name: 'Md. Anamul Huque',
      position: 'Advisor of Science Club',
      qualification: 'Physics Teacher',
      specialization: ''
    },
    {
      name: 'Nasima Begum',
      position: 'Chemistry Coordinator, Lab Advisor',
      qualification: 'Chemistry Teacher',
      specialization: ''
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/95 to-background"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Get in <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our science club? We'd love to hear from you. Reach out to us anytime!
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
                className="animate-slide-up" 
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <Card className="bg-gradient-card border-glass-border backdrop-blur-sm p-6 hover:shadow-glow transition-all duration-500 hover:-translate-y-2 group text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${item.gradient} rounded-lg shadow-glow mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="space-y-1">
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Faculty & Quick Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Faculty Members */}
          <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
            <Card className="bg-gradient-secondary border-0 p-8 text-white h-full">
              <div className="flex items-center mb-6">
                <Users className="w-6 h-6 mr-3" />
                <h3 className="text-2xl font-semibold">Expert Teachers</h3>
              </div>
              
              <div className="space-y-6">
                {facultyMembers.map((member, index) => (
                  <div key={index} className="border-b border-white/20 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="font-semibold text-lg mb-1">{member.name}</h4>
                    <p className="text-white/90 text-sm mb-2">{member.position}</p>
                    <p className="text-white/80 text-xs mb-1">{member.qualification}</p>
                    {member.specialization && (
                      <p className="text-white/70 text-xs">{member.specialization}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="animate-slide-up" style={{animationDelay: '0.6s'}}>
            <Card className="bg-gradient-card border-glass-border backdrop-blur-sm p-8 h-full">
              <div className="flex items-center mb-6">
                <Award className="w-6 h-6 mr-3 text-primary" />
                <h3 className="text-2xl font-semibold">Quick Actions</h3>
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  onClick={() => document.querySelector('#join')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join Our Club
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full border-glass-border bg-glass hover:bg-gradient-card transition-all duration-300"
                  onClick={() => document.querySelector('#simulations')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Award className="w-5 h-5 mr-2" />
                  Explore Simulations
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full border-glass-border bg-glass hover:bg-gradient-card transition-all duration-300"
                  onClick={() => window.open('mailto:scienceclub@mmsc.edu.bd')}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </Button>
              </div>

              {/* Contact Stats */}
              <div className="mt-8 pt-6 border-t border-glass-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-xs text-muted-foreground">Online Support</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">&lt;2hrs</div>
                    <div className="text-xs text-muted-foreground">Response Time</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* School Information */}
        <div className="mt-16 animate-scale-in">
          <Card className="bg-gradient-hero border-glass-border backdrop-blur-sm p-8 shadow-elegant text-center">
            <h3 className="text-2xl font-semibold mb-4 bg-gradient-accent bg-clip-text text-transparent">
              Motijheel Model School and College
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Established in 1965, Motijheel Model School and College is one of the premier educational institutions in Dhaka, 
              known for its excellence in science education and research. Our Science Club continues this tradition of 
              excellence by fostering scientific curiosity and innovation among students.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};