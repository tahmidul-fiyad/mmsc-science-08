import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Facebook } from 'lucide-react';
import mmscLogo from '@/assets/mmsc-logo.jpg';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  const quickLinks = [
    { name: 'About Club', href: '#about' },
    { name: 'Simulations', href: '#simulations' },
    { name: 'Notice Board', href: '#notices' },
    { name: 'Membership', href: '#join' },
  ];

  const resources = [
    { name: 'Physics Lab', href: '#simulations' },
    { name: 'Chemistry Lab', href: '#simulations' },
    { name: 'Research Projects', href: '#about' },
    { name: 'Competitions', href: '#notices' },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-background via-background/95 to-background border-t border-glass-border">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Club Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={mmscLogo} 
                  alt="MMSC Science and Technology Forum Logo" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                  MMSC Science and Technology Forum
                </h3>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Inspiring the next generation of scientists through innovative learning, 
              cutting-edge research, and hands-on experimentation at Motijheel Model School and College.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-2">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gradient-card hover:shadow-glow transition-all duration-300"
                    onClick={() => window.open(social.href, '_blank')}
                  >
                    <IconComponent className="w-4 h-4" />
                  </Button>
                );
              })}
            </div>
          </div>
{/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-primary transition-colors duration-300 justify-start"
                    onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {link.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-secondary transition-colors duration-300 justify-start"
                    onClick={() => document.querySelector(resource.href)?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {resource.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <div>Motijheel Model School and College</div>
                  <div>Atish Dipankar Road, Central Basabo,</div>
                  <div>Sabujbagh Thana, Dhaka-1214</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">+880 1819-184952</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">mmscscience.techforum@gmail.com</span>
              </div>
            </div>
            
            <Button 
              size="sm" 
              className="bg-gradient-accent hover:shadow-glow transition-all duration-300 w-full"
              onClick={() => document.querySelector('#join')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Join Our Club
            </Button>
          </div>
        </div>
<Separator className="my-8 bg-glass-border" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>
              © {currentYear} <span className="font-medium">Motijheel Model School and College Science Club</span>. 
              All rights reserved.
            </p>
            <p className="mt-1">
              Built with ❤️ for scientific excellence and innovation.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="text-center">
              <p className="mb-1">
                Developed by <span className="font-semibold text-foreground">Tahmidul Islam</span><br />
                <span className="text-xs">SSC Batch 2027 in MMSC</span>
              </p>
            </div>
            <Separator orientation="vertical" className="h-12" />
            <div>
              <span>Made with advanced web technologies</span>
              <div className="flex space-x-2 mt-1">
                <span className="px-2 py-1 bg-gradient-primary rounded text-white font-mono text-xs">React</span>
                <span className="px-2 py-1 bg-gradient-secondary rounded text-white font-mono text-xs">TypeScript</span>
                <span className="px-2 py-1 bg-gradient-accent rounded text-white font-mono text-xs">Tailwind</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};