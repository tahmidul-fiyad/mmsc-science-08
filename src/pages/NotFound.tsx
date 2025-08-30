import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Atom } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-secondary rounded-full animate-float opacity-80" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-accent rounded-full animate-float opacity-40" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        {/* 404 Icon */}
        <div className="mb-8 animate-scale-in">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-60"></div>
            <div className="relative bg-gradient-primary p-6 rounded-full">
              <Atom className="w-16 h-16 text-white animate-pulse-glow" />
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Oops! It looks like this page has undergone a quantum tunneling effect and disappeared into another dimension. 
            Let's get you back to the <strong className="text-primary">MMSC Science Club</strong> homepage.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.4s'}}>
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300"
            onClick={() => window.location.href = '/'}
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-glass-border bg-glass backdrop-blur-sm hover:bg-gradient-card transition-all duration-300"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Fun Science Fact */}
        <div className="mt-12 animate-fade-in" style={{animationDelay: '0.6s'}}>
          <div className="bg-glass backdrop-blur-sm border border-glass-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 bg-gradient-secondary bg-clip-text text-transparent">
              Science Fact
            </h3>
            <p className="text-muted-foreground text-sm">
              Did you know? In quantum mechanics, particles can exist in multiple states simultaneously 
              until observed. Just like this page - it exists and doesn't exist at the same time! 🔬
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
