import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
  type: 'atom' | 'dna' | 'molecule' | 'formula' | 'constellation' | 'electron';
  twinkle: number;
  originalY: number;
  electrons?: Array<{angle: number, distance: number, speed: number}>;
  symbol?: string;
}

export const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleTypes: Array<'atom' | 'dna' | 'molecule' | 'formula' | 'constellation' | 'electron'> = 
      ['atom', 'dna', 'molecule', 'formula', 'constellation', 'electron'];
    
    const scientificSymbols = ['H₂O', 'CO₂', 'NaCl', 'CH₄', 'O₂', 'N₂', 'E=mc²', 'F=ma', 'v=d/t', 'pH', '∆', '∑', 'π', 'α', 'β', 'γ'];
    
    // Create initial particles with science theme
    const createParticle = (): Particle => {
      const baseY = Math.random() * canvas.height;
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      
      const particle: Particle = {
        x: Math.random() * canvas.width,
        y: baseY,
        originalY: baseY,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 6 + 2,
        life: 0,
        maxLife: Math.random() * 600 + 300,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type,
        twinkle: Math.random() * Math.PI * 2
      };

      // Add specific properties based on type
      if (type === 'atom') {
        particle.electrons = Array.from({length: Math.floor(Math.random() * 3) + 1}, (_, i) => ({
          angle: (i * Math.PI * 2) / 3,
          distance: particle.size * (1.5 + i * 0.5),
          speed: 0.05 + Math.random() * 0.03
        }));
      } else if (type === 'formula') {
        particle.symbol = scientificSymbols[Math.floor(Math.random() * scientificSymbols.length)];
        particle.size = Math.random() * 4 + 3;
      }

      return particle;
    };

    // Initialize particles - more for science theme
    for (let i = 0; i < 60; i++) {
      particlesRef.current.push(createParticle());
    }

    const drawAtom = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      
      // Draw nucleus
      ctx.fillStyle = 'hsl(217, 91%, 70%)';
      ctx.beginPath();
      ctx.arc(0, 0, particle.size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw electron orbits and electrons
      if (particle.electrons) {
        particle.electrons.forEach((electron, i) => {
          // Orbit path
          ctx.strokeStyle = 'hsl(271, 81%, 50%)';
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.3;
          ctx.beginPath();
          ctx.ellipse(0, 0, electron.distance, electron.distance * 0.3, i * Math.PI / 3, 0, Math.PI * 2);
          ctx.stroke();
          
          // Electron
          ctx.globalAlpha = 1;
          const electronX = Math.cos(electron.angle) * electron.distance;
          const electronY = Math.sin(electron.angle) * electron.distance * 0.3;
          ctx.fillStyle = 'hsl(142, 76%, 60%)';
          ctx.beginPath();
          ctx.arc(electronX, electronY, 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Update electron position
          electron.angle += electron.speed;
        });
      }
      
      ctx.restore();
    };

    const drawDNA = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      
      const height = particle.size * 3;
      const width = particle.size * 0.8;
      
      // Draw DNA double helix
      ctx.strokeStyle = 'hsl(217, 91%, 60%)';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.8;
      
      for (let i = 0; i < height; i += 2) {
        const y = i - height/2;
        const offset = Math.sin((y + particle.life * 0.02) * 0.3) * width;
        
        // Left strand
        ctx.beginPath();
        ctx.arc(-offset, y, 1, 0, Math.PI * 2);
        ctx.stroke();
        
        // Right strand  
        ctx.beginPath();
        ctx.arc(offset, y, 1, 0, Math.PI * 2);
        ctx.stroke();
        
        // Connecting base pairs
        if (i % 4 === 0) {
          ctx.beginPath();
          ctx.moveTo(-offset, y);
          ctx.lineTo(offset, y);
          ctx.stroke();
        }
      }
      
      ctx.restore();
    };

    const drawMolecule = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      
      // Draw molecular structure
      const bonds = 4;
      for (let i = 0; i < bonds; i++) {
        const angle = (i * Math.PI * 2) / bonds;
        const x = Math.cos(angle) * particle.size;
        const y = Math.sin(angle) * particle.size;
        
        // Bond line
        ctx.strokeStyle = 'hsl(142, 76%, 40%)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Atom at end
        ctx.fillStyle = i % 2 === 0 ? 'hsl(217, 91%, 60%)' : 'hsl(271, 81%, 60%)';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Central atom
      ctx.fillStyle = 'hsl(142, 76%, 50%)';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawFormula = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      if (!particle.symbol) return;
      
      ctx.save();
      ctx.translate(particle.x, particle.y);
      
      ctx.fillStyle = 'hsl(271, 81%, 70%)';
      ctx.font = `${particle.size * 2}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(particle.symbol, 0, 0);
      
      ctx.restore();
    };

    const drawConstellation = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      
      // Draw constellation pattern
      const stars = 5;
      const points: {x: number, y: number}[] = [];
      
      for (let i = 0; i < stars; i++) {
        const angle = (i * Math.PI * 2) / stars + particle.rotation;
        const distance = particle.size * (0.5 + Math.random() * 0.5);
        points.push({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance
        });
      }
      
      // Draw connecting lines
      ctx.strokeStyle = 'hsl(217, 91%, 50%)';
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.6;
      for (let i = 0; i < points.length; i++) {
        const next = (i + 1) % points.length;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[next].x, points[next].y);
        ctx.stroke();
      }
      
      // Draw stars
      ctx.fillStyle = 'hsl(217, 91%, 70%)';
      ctx.globalAlpha = 1;
      points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      particlesRef.current.forEach((particle, index) => {
        // Scientific floating motion
        particle.x += particle.vx + Math.sin(particle.life * 0.01) * 0.2;
        particle.y += particle.vy + Math.cos(particle.life * 0.008) * 0.15;
        particle.rotation += particle.rotationSpeed;
        particle.twinkle += 0.05;
        particle.life++;

        // Boundary wrapping
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Calculate opacity with scientific pulse
        const baseOpacity = Math.max(0, 1 - particle.life / particle.maxLife);
        const pulseEffect = particle.type === 'atom' ? 
          (Math.sin(particle.twinkle * 2) * 0.2 + 0.8) : 
          (Math.sin(particle.twinkle) * 0.1 + 0.9);
        const opacity = baseOpacity * pulseEffect * 0.7;

        // Draw particle based on scientific type
        ctx.save();
        ctx.globalAlpha = opacity;
        
        switch (particle.type) {
          case 'atom':
            drawAtom(ctx, particle);
            break;
          case 'dna':
            drawDNA(ctx, particle);
            break;
          case 'molecule':
            drawMolecule(ctx, particle);
            break;
          case 'formula':
            drawFormula(ctx, particle);
            break;
          case 'constellation':
            drawConstellation(ctx, particle);
            break;
          case 'electron':
            // Simple glowing electron
            const gradient = ctx.createRadialGradient(
              particle.x, particle.y, 0,
              particle.x, particle.y, particle.size
            );
            gradient.addColorStop(0, 'hsl(142, 76%, 70%)');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        
        ctx.restore();

        // Reset particles when they die
        if (particle.life >= particle.maxLife) {
          particlesRef.current[index] = createParticle();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};