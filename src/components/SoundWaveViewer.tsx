import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import p5 from 'p5';

interface SoundWaveViewerProps {
  isRunning: boolean;
}

export const SoundWaveViewer: React.FC<SoundWaveViewerProps> = ({ isRunning }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);
  const [frequency, setFrequency] = useState([440]); // Hz
  const [amplitude, setAmplitude] = useState([50]); // pixels
  const [speed, setSpeed] = useState([1]); // Animation speed multiplier (1 = normal)
  
  // Calculated values (using real physics for display)
  const actualSpeed = 340; // Real speed of sound in m/s
  const wavelength = actualSpeed / frequency[0]; // lambda = v/f
  const period = 1 / frequency[0]; // T = 1/f
  const [waveCount, setWaveCount] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Clean up existing p5 instance
    if (p5Ref.current) {
      p5Ref.current.remove();
      p5Ref.current = null;
    }

    const sketch = (p: p5) => {
      let time = 0;
      let lastWaveCount = 0;
      
      console.log('Sound wave sketch created/updated with speed:', speed[0]);

      p.setup = () => {
        if (!canvasRef.current) return;
        const canvas = p.createCanvas(720, 400);
        canvas.parent(canvasRef.current);
      };

      p.draw = () => {
        // Check if dark mode is active
        const isDarkMode = document.documentElement.classList.contains('dark');
        
        // Background with grid
        if (isDarkMode) {
          p.background(15, 20, 35); // Dark blue background
        } else {
          p.background(240, 245, 255); // Light blue background
        }
        
        // Draw grid lines
        p.push();
        if (isDarkMode) {
          p.stroke(30, 50, 80, 100); // Dark grid lines
        } else {
          p.stroke(200, 220, 240, 100); // Light grid lines
        }
        p.strokeWeight(0.5);
        
        // Vertical grid lines
        for (let x = 0; x <= p.width; x += 40) {
          p.line(x, 0, x, p.height);
        }
        
        // Horizontal grid lines
        for (let y = 0; y <= p.height; y += 40) {
          p.line(0, y, p.width, y);
        }
        p.pop();

        // Center line
        p.push();
        if (isDarkMode) {
          p.stroke(60, 80, 120, 150);
        } else {
          p.stroke(150, 170, 200, 150);
        }
        p.strokeWeight(1);
        p.line(0, p.height / 2, p.width, p.height / 2);
        p.pop();

        // Calculate wave parameters - using current state values
        const currentFreq = frequency[0] / 100; // Scale frequency for visual appeal
        const currentAmp = amplitude[0];
        const currentAnimationSpeed = speed[0] * 3; // Increased sensitivity
        const wavelengthPixels = p.width / (currentFreq * 2); // Visual wavelength in pixels
        
        // Debug log every 60 frames
        if (p.frameCount % 60 === 0) {
          console.log('Wave params:', { 
            freq: currentFreq, 
            amp: currentAmp, 
            animationSpeed: currentAnimationSpeed, 
            speedState: speed[0], 
            time 
          });
        }
        
        // Draw the main wave with glow effect
        p.push();
        
        // Create glow effect with multiple layers
        for (let glow = 3; glow >= 1; glow--) {
          p.stroke(0, 255, 255, 255 / (glow * 2)); // Neon cyan with fading alpha
          p.strokeWeight(3 + glow * 2);
          p.noFill();
          
          p.beginShape();
          for (let x = 0; x <= p.width; x += 1) {
            // Smooth sine wave calculation with sensitive speed control
            const phase = (2 * Math.PI * x / wavelengthPixels) - (time * currentAnimationSpeed * 0.15);
            const y = p.height / 2 + currentAmp * Math.sin(phase);
            p.vertex(x, y);
          }
          p.endShape();
        }
        
        // Main bright wave line
        p.stroke(0, 255, 255); // Pure neon cyan
        p.strokeWeight(2);
        p.noFill();
        
        p.beginShape();
        for (let x = 0; x <= p.width; x += 1) {
          const phase = (2 * Math.PI * x / wavelengthPixels) - (time * currentAnimationSpeed * 0.15);
          const y = p.height / 2 + currentAmp * Math.sin(phase);
          p.vertex(x, y);
        }
        p.endShape();
        
        p.pop();

        // Update time and wave count if running
        if (isRunning) {
          time += 1;
          
          // Count complete waves based on time and animation speed
          const currentWaveCount = Math.floor((time * currentAnimationSpeed * 0.15) / (2 * Math.PI));
          if (currentWaveCount > lastWaveCount) {
            setWaveCount(currentWaveCount);
            lastWaveCount = currentWaveCount;
          }
        }
      };

      p.windowResized = () => {
        if (canvasRef.current) {
          p.resizeCanvas(720, 400);
        }
      };
    };

    p5Ref.current = new p5(sketch, canvasRef.current);

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, [frequency, amplitude, speed, isRunning]);

  return (
    <div className="space-y-6">
      {/* Wave Display */}
      <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-950/40 dark:to-blue-900/40 border border-glass-border rounded-xl relative overflow-hidden shadow-elegant backdrop-blur-sm">
        <div ref={canvasRef} className="w-full h-96 flex items-center justify-center" />
        
        {/* Wave Statistics Overlay */}
        <div className="absolute top-4 right-4 bg-glass backdrop-blur-sm border border-glass-border rounded-lg p-3 space-y-1">
          <div className="text-xs text-muted-foreground">Wave Statistics</div>
          <div className="space-y-1 text-xs">
            <div>f = {frequency[0]} Hz</div>
            <div>λ = {wavelength.toFixed(2)} m</div>
            <div>v = {actualSpeed} m/s</div>
            <div>T = {period.toFixed(4)} s</div>
            <div>Waves: {waveCount}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-card border-glass-border">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Frequency (f)</label>
              <Badge variant="outline" className="text-xs">
                {frequency[0]} Hz
              </Badge>
            </div>
            <Slider
              value={frequency}
              onValueChange={setFrequency}
              max={1000}
              min={100}
              step={10}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground">
              Controls wave oscillations per second
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card border-glass-border">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Amplitude</label>
              <Badge variant="outline" className="text-xs">
                {amplitude[0]} px
              </Badge>
            </div>
            <Slider
              value={amplitude}
              onValueChange={setAmplitude}
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground">
              Controls wave height (loudness)
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card border-glass-border">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Animation Speed</label>
              <Badge variant="outline" className="text-xs">
                {speed[0]}x
              </Badge>
            </div>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              max={3}
              min={0.1}
              step={0.1}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground">
              Controls wave animation speed (visual only)
            </div>
          </div>
        </Card>
      </div>

      {/* Wave Properties Info */}
      <Card className="p-4 bg-muted/20">
        <h4 className="text-sm font-medium mb-2">Sound Wave Properties:</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Frequency (f): Number of oscillations per second (Hz)</li>
          <li>• Wavelength (λ): Distance between wave crests (λ = v/f)</li>
          <li>• Amplitude: Maximum displacement from equilibrium</li>
          <li>• Period (T): Time for one complete oscillation (T = 1/f)</li>
          <li>• Velocity (v): Speed of wave propagation = 340 m/s (in air)</li>
          <li>• Animation Speed: Visual playback speed multiplier</li>
          <li>• Wave equation: y = A·sin(2πf·t - 2πx/λ)</li>
        </ul>
      </Card>
    </div>
  );
};