import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Menu, X, Beaker, Atom, GraduationCap } from 'lucide-react';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', icon: GraduationCap },
    { name: 'About', href: '#about', icon: Atom },
    { name: 'Simulations', href: '#simulations', icon: Beaker },
    { name: 'Notice Board', href: '#notices', icon: Menu },
    { name: 'Join Us', href: '#join', icon: GraduationCap },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-glass-border shadow-elegant' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src="/mmsc-logo.jpg" alt="MMSC Logo" className="w-12 h-12 rounded-full shadow-lg" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MMSC Science Club
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                xyzxyzxyz
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  size="sm"
                  className="hover:bg-gradient-card hover:shadow-glow transition-all duration-300"
                  onClick={() => {
                    document.querySelector(item.href)?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {item.name}
                </Button>
              );
            })}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:bg-gradient-card transition-all duration-300"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
<Moon className="w-5 h-5 text-black dark:text-white" />
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="bg-gradient-card rounded-lg p-4 border border-glass-border backdrop-blur-xl">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="w-full justify-start mb-2 hover:bg-primary/10"
                    onClick={() => {
                      document.querySelector(item.href)?.scrollIntoView({ 
                        behavior: 'smooth' 
                      });
                      setIsMenuOpen(false);
                    }}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {item.name}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};