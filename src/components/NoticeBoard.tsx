import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, Users, Award, ExternalLink } from 'lucide-react';

export const NoticeBoard = () => {

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

        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <Card className="bg-gradient-card border-glass-border backdrop-blur-sm p-12 shadow-card">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-lg shadow-glow mx-auto mb-6">
              <Bell className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-semibold mb-4">No Current Notices</h3>
            <p className="text-muted-foreground leading-relaxed">
              There are no notices available at the moment. Please check back later for updates on events, announcements, and opportunities.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};