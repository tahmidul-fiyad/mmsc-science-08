import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, Users, Award, ExternalLink } from 'lucide-react';

export const NoticeBoard = () => {
  const notices = [
    {
      id: 1,
      type: 'urgent',
      title: 'National Science Olympiad Registration',
      description: 'Registration is now open for the National Science Olympiad 2024. All club members are encouraged to participate.',
      date: '2024-01-15',
      category: 'Competition',
      deadline: '2024-02-01',
      icon: Award
    },
    {
      id: 2,
      type: 'event',
      title: 'Chemistry Lab Workshop',
      description: 'Join us for an advanced chemistry workshop featuring molecular modeling and synthesis techniques.',
      date: '2024-01-20',
      category: 'Workshop',
      deadline: '2024-01-18',
      icon: Users
    },
    {
      id: 3,
      type: 'announcement',
      title: 'New Physics Simulation Lab',
      description: 'We are excited to announce the launch of our new interactive physics simulation laboratory.',
      date: '2024-01-10',
      category: 'Announcement',
      icon: Bell
    },
    {
      id: 4,
      type: 'event',
      title: 'Inter-School Science Fair',
      description: 'Participate in the inter-school science fair and showcase your innovative projects.',
      date: '2024-01-25',
      category: 'Competition',
      deadline: '2024-01-22',
      icon: Award
    },
    {
      id: 5,
      type: 'announcement',
      title: 'Club Meeting Schedule',
      description: 'Regular club meetings will be held every Friday at 3:00 PM in the Science Laboratory.',
      date: '2024-01-05',
      category: 'Schedule',
      icon: Calendar
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-destructive text-destructive-foreground';
      case 'event':
        return 'bg-primary text-primary-foreground';
      case 'announcement':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="notices" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-glass backdrop-blur-sm border border-glass-border rounded-full px-6 py-2 mb-6">
            <Bell className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">Latest Updates</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">Notice Board</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest announcements, events, and opportunities from our science club.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {notices.map((notice, index) => {
            const IconComponent = notice.icon;
            return (
              <div 
                key={notice.id} 
                className="animate-slide-up" 
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <Card className="bg-gradient-card border-glass-border backdrop-blur-sm p-6 hover:shadow-glow transition-all duration-500 hover:-translate-y-1 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg shadow-glow">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <Badge className={`${getTypeColor(notice.type)} text-xs`}>
                          {notice.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {new Date(notice.date).toLocaleDateString()}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {notice.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {notice.description}
                  </p>

                  <div className="flex items-center justify-between">
                    {notice.deadline && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Deadline: {new Date(notice.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                    >
                      Read More
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 animate-scale-in">
          <Card className="bg-gradient-accent border-glass-border backdrop-blur-sm p-8 shadow-elegant">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">15</div>
                <div className="text-white/80">Active Notices</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">8</div>
                <div className="text-white/80">Upcoming Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">3</div>
                <div className="text-white/80">Open Competitions</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};