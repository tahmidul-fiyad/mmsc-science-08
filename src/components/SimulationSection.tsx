import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Atom, Waves, Zap, FlaskConical, Box } from 'lucide-react';
import p5 from 'p5';
import Matter from 'matter-js';
import { MoleculeViewer } from './MoleculeViewer';
import { AtomViewer } from './AtomViewer';
import { DimensionsViewer } from './DimensionsViewer';
import { SoundWaveViewer } from './SoundWaveViewer';


export const SimulationSection = () => {
  const [physicsRunning, setPhysicsRunning] = useState(true);
  const [chemistryRunning, setChemistryRunning] = useState(false);
  const [activePhysicsSim, setActivePhysicsSim] = useState(0);
  const [slowMotion, setSlowMotion] = useState(false);
  const [activeTab, setActiveTab] = useState('physics');
  
  // Force re-render by adding a key to the physics simulation
  const [physicsKey, setPhysicsKey] = useState(0);

  // Realistic Newton's Cradle Implementation with 5 balls
  const cradleCanvasRef = useRef<HTMLDivElement>(null);
  const cradleP5Ref = useRef<p5 | null>(null);
  const resetCradleRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (activePhysicsSim === 0 && activeTab === 'physics' && cradleCanvasRef.current && !cradleP5Ref.current) {
      // Clear any existing content
      cradleCanvasRef.current.innerHTML = '';
      
      // Add delay to ensure DOM is ready
      const timer = setTimeout(() => {
        if (!cradleCanvasRef.current || cradleP5Ref.current) return;
        
        const sketch = (p: p5) => {
        const Engine = Matter.Engine,
          World = Matter.World,
          Constraint = Matter.Constraint,
          Bodies = Matter.Bodies,
          Body = Matter.Body,
          Events = Matter.Events,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

        let cradle: Pendulum;
        let engine: Matter.Engine;
        let world: Matter.World;
        let mouseConstraint: Matter.MouseConstraint;
        let strings: Matter.Constraint[] = [];
        let collisionCount = 0;
        let energyLoss = 0;

        class Pendulum {
          bodies: Matter.Body[] = [];
          constraints: Matter.Constraint[] = [];
          x: number;
          y: number;
          num: number;
          size: number;
          len: number;

          constructor(x: number, y: number, num: number, size: number, len: number) {
            this.x = x;
            this.y = y;
            this.num = num;
            this.size = size;
            this.len = len;

            // Create pendulum balls
            for (let i = 0; i < this.num; i++) {
              // Position balls so they just touch each other
              const ballX = this.x + i * (this.size * 2);
              const ballY = this.y + this.len;
              
              // Create ball with perfect physics - no energy loss
              const ball = Bodies.circle(ballX, ballY, this.size, {
                density: 0.008,
                restitution: 1, // Perfect elastic
                friction: 0,    // No friction
                frictionAir: 0, // No air resistance
                frictionStatic: 0,
                inertia: Infinity // Prevent rotation energy loss
              });

              this.bodies.push(ball);

              // Create constraint (string)
              const constraint = Constraint.create({
                pointA: { x: ballX, y: this.y },
                bodyB: ball,
                stiffness: 1,
                length: this.len,
                damping: 0
              });

              this.constraints.push(constraint);
              World.add(world, [ball, constraint]);
              strings.push(constraint);
            }
          }

          show() {
            // Check if dark mode is active
            const isDarkMode = document.documentElement.classList.contains('dark');
            
            // Draw support beam at top (theme-aware)
            p.push();
            if (isDarkMode) {
              // Realistic dark wood/metal beam
              p.fill(80, 70, 60);
              p.stroke(60, 50, 40);
              p.strokeWeight(1);
            } else {
              // Original green beam for light mode
              p.fill(143, 200, 132);
            }
            p.rect(0, 0, p.width, 15);
            p.pop();

            // Draw each pendulum ball
            for (let i = 0; i < this.bodies.length; i++) {
              const ball = this.bodies[i];
              const constraint = this.constraints[i];
              const pos = ball.position;
              
              // Draw string (theme-aware)
              p.push();
              if (isDarkMode) {
                p.stroke(160, 150, 140); // Realistic string color
                p.strokeWeight(1.5);
              } else {
                p.stroke(0); // Black string for light mode
                p.strokeWeight(1);
              }
              p.line(constraint.pointA.x, constraint.pointA.y, pos.x, pos.y);
              p.pop();
              
              // Draw ball shadow first (for depth)
              if (isDarkMode) {
                p.push();
                p.fill(0, 0, 0, 60);
                p.noStroke();
                p.circle(pos.x + 3, pos.y + 3, this.size * 2);
                p.pop();
              }
              
              // Draw ball (theme-aware)
              p.push();
              if (isDarkMode) {
                // Realistic metallic steel balls
                p.fill(160, 170, 180);
                p.stroke(120, 130, 140);
                p.strokeWeight(1);
              } else {
                // Original silver balls for light mode
                p.fill(200, 200, 200);
                p.stroke(100);
                p.strokeWeight(1);
              }
              p.circle(pos.x, pos.y, this.size * 2);
              
              // Add realistic metallic highlight
              p.push();
              if (isDarkMode) {
                // Subtle metallic highlight
                p.fill(220, 230, 240, 180);
                p.noStroke();
                p.circle(pos.x - this.size * 0.4, pos.y - this.size * 0.4, this.size * 0.8);
                
                // Secondary smaller highlight
                p.fill(255, 255, 255, 120);
                p.circle(pos.x - this.size * 0.2, pos.y - this.size * 0.2, this.size * 0.3);
              } else {
                p.fill(255, 255, 255, 150);
                p.noStroke();
                p.circle(pos.x - this.size * 0.3, pos.y - this.size * 0.3, this.size * 0.6);
              }
              p.pop();
              p.pop();
            }
          }
        }

        p.setup = () => {
          // Ensure parent element exists and is ready
          if (!cradleCanvasRef.current) {
            console.error('Canvas container not found');
            return;
          }

          try {
            const canvas = p.createCanvas(720, 400);
            if (!canvas || !cradleCanvasRef.current) {
              console.error('Failed to create canvas or container missing');
              return;
            }
            
            canvas.parent(cradleCanvasRef.current);
            
            engine = Engine.create({
              enableSleeping: false,
              timing: {
                timeScale: slowMotion ? 0.5 : 1
              }
            });
            world = engine.world;
          
            // Set realistic gravity
            engine.world.gravity.y = 1.2;
            engine.world.gravity.scale = 0.01;
            
            // Mouse constraint for interactive dragging
            const mouse = Mouse.create(canvas.elt);
            if (mouse && p.pixelDensity) {
              mouse.pixelRatio = p.pixelDensity();
            }
            mouseConstraint = MouseConstraint.create(engine, {
              mouse: mouse,
              constraint: {
                stiffness: 0.8,
                render: { visible: false },
                damping: 0
              }
            });
            World.add(world, mouseConstraint);

            // Create Newton's cradle centered on canvas
            // Canvas is 720px wide, ball diameter is 52px, 5 balls = 260px total width
            // Center position: (720 - 4*52) / 2 = 256px for first ball
            cradle = new Pendulum(256, 15, 5, 25, 220);

            Engine.run(engine);
          } catch (error) {
            console.error('Error setting up Newton\'s cradle:', error);
          }
        };

        p.draw = () => {
          // Ensure engine, world, and cradle exist before drawing
          if (!engine || !world || !cradle) return;
          
          try {
            // Check if dark mode is active
            const isDarkMode = document.documentElement.classList.contains('dark');
            
            // Theme-aware background
            if (isDarkMode) {
              p.background(25, 25, 30); // Realistic dark gray background
            } else {
              p.background(250); // Light background for light mode
            }
            
            // Show the cradle
            if (cradle && cradle.show) {
              cradle.show();
            }

            // Update physics only if running
            if (physicsRunning && engine) {
              Engine.update(engine, slowMotion ? 10 : 16.67);
            }
          } catch (error) {
            console.error('Error in draw loop:', error);
          }
        };

        // Reset function
        const resetCradle = () => {
          try {
            if (cradle && cradle.bodies && cradle.bodies.length > 0) {
              // Reset all balls to rest position
              collisionCount = 0;
              cradle.bodies.forEach((ball, i) => {
                const restX = 256 + i * (25 * 2); // Match initial positioning
                const restY = 15 + 220; // anchor y + string length
                Body.setPosition(ball, { x: restX, y: restY });
                Body.setVelocity(ball, { x: 0, y: 0 });
              });
            }
          } catch (error) {
            console.error('Error resetting cradle:', error);
          }
        };

        // Expose reset function
        resetCradleRef.current = resetCradle;

        p.keyPressed = () => {
          try {
            if (p.key === 'r' || p.key === 'R') {
              resetCradle();
            }
          } catch (error) {
            console.error('Error in keyPressed:', error);
          }
        };
      };

      try {
        cradleP5Ref.current = new p5(sketch, cradleCanvasRef.current);
      } catch (error) {
        console.error('Error creating p5 instance:', error);
      }
      }, 100); // 100ms delay to ensure DOM is ready

      return () => clearTimeout(timer);
    }

    return () => {
      if (cradleP5Ref.current) {
        try {
          cradleP5Ref.current.remove();
        } catch (error) {
          console.error('Error removing p5 instance:', error);
        }
        cradleP5Ref.current = null;
      }
      // Clear canvas container
      if (cradleCanvasRef.current) {
        cradleCanvasRef.current.innerHTML = '';
      }
    };
  }, [activePhysicsSim, slowMotion, activeTab, physicsRunning]);

  const physicsSimulations = [
    {
      name: "Newton's Cradle",
      description: 'Conservation of momentum & energy, symmetry',
      icon: Atom,
      active: activePhysicsSim === 0
    },
    {
      name: 'Dimensions',
      description: 'Explore 1D, 2D, 3D, and 4D geometric spaces',
      icon: Box,
      active: activePhysicsSim === 1
    },
    {
      name: 'Sound Waves',
      description: 'Wave physics, frequency, wavelength & amplitude',
      icon: Waves,
      active: activePhysicsSim === 2
    }
  ];

  const [activeChemistrySim, setActiveChemistrySim] = useState(0);

  const chemistrySimulations = [
    {
      name: 'Molecule viewer',
      description: '3D interactive molecular structures with orbit controls',
      icon: Atom,
      active: activeChemistrySim === 0
    },
    {
      name: 'Atom viewer',
      description: 'Interactive atomic structure with nucleus and electron shells',
      icon: Atom,
      active: activeChemistrySim === 1
    }
  ];

  return (
    <section id="simulations" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tl from-background via-background/90 to-background"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-glass backdrop-blur-sm border border-glass-border rounded-full px-6 py-2 mb-6">
            <Atom className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">Interactive Learning</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-accent bg-clip-text text-transparent">Interactive Simulations</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore physics and chemistry through immersive, interactive simulations that bring complex concepts to life.
          </p>
        </div>

        <Tabs defaultValue="physics" className="max-w-6xl mx-auto" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8 h-14">
            <TabsTrigger value="physics" className="text-lg py-3 flex items-center justify-center gap-2 h-full">
              <Zap className="w-5 h-5" />
              Physics Lab
            </TabsTrigger>
            <TabsTrigger value="chemistry" className="text-lg py-3 flex items-center justify-center gap-2 h-full">
              <FlaskConical className="w-5 h-5" />
              Chemistry Lab
            </TabsTrigger>
          </TabsList>

          {/* Physics Simulations */}
          <TabsContent value="physics" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Available Simulations */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Available Simulations</h3>
                {physicsSimulations.map((sim, index) => {
                  const IconComponent = sim.icon;
                  return (
                     <Card 
                       key={index}
                       onClick={() => {
                         setActivePhysicsSim(index);
                         if (index === 0) setPhysicsKey(prev => prev + 1); // Force re-render for Newton's cradle
                       }}
                       className={`p-4 cursor-pointer transition-all duration-300 ${
                         sim.active 
                           ? 'bg-gradient-primary border-0 text-white shadow-glow' 
                           : 'bg-gradient-card border-glass-border hover:shadow-card'
                       }`}
                     >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5" />
                        <div>
                          <h4 className="font-medium">{sim.name}</h4>
                          <p className={`text-xs ${sim.active ? 'text-white/80' : 'text-muted-foreground'}`}>
                            {sim.description}
                          </p>
                        </div>
                      </div>
                      {sim.active && (
                        <Badge className="mt-2 bg-white/20 text-white border-0">Active</Badge>
                      )}
                    </Card>
                  );
                })}
              </div>

              {/* Main Simulation Area */}
              <div className="lg:col-span-2">
                <Card className="bg-gradient-card border-glass-border backdrop-blur-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">
                      {activePhysicsSim === 0 ? "Newton's Cradle Simulator" : 
                       activePhysicsSim === 1 ? "Dimensions Explorer" : 
                       activePhysicsSim === 2 ? "Sound Waves Simulator" : "Physics Simulator"}
                    </h3>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                          onClick={() => {
                            if (activePhysicsSim === 0) {
                              resetCradleRef.current();
                            }
                          }}
                        className="border-glass-border"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      {activePhysicsSim === 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSlowMotion(!slowMotion)}
                          className={`border-glass-border ${slowMotion ? 'bg-primary/20' : ''}`}
                        >
                          Slow-Mo
                        </Button>
                      )}
                    </div>
                  </div>

                   {/* Simulation Canvas */}
                   <div className="bg-glass rounded-lg p-4 border border-glass-border">
                      {activePhysicsSim === 0 && (
                        <div key={physicsKey} className="h-96 bg-gradient-to-br from-slate-50/80 to-slate-100/80 border border-glass-border rounded-xl relative overflow-hidden shadow-elegant backdrop-blur-sm">
                          <div ref={cradleCanvasRef} className="w-full h-full flex items-center justify-center" />
                          {slowMotion && physicsRunning && (
                            <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-glass px-3 py-1 rounded-full border border-glass-border">
                              Slow Motion Active
                            </div>
                          )}
                        </div>
                      )}
                       {activePhysicsSim === 1 && (
                         <DimensionsViewer isRunning={physicsRunning} />
                       )}
                       {activePhysicsSim === 2 && (
                         <SoundWaveViewer isRunning={physicsRunning} />
                       )}
                   </div>

                  {/* Controls */}
                  <div className="space-y-6 mt-6">
                    {activePhysicsSim === 0 && (
                      // Newton's Cradle - Perfect Energy Conservation
                      <div className="bg-muted/20 rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-2">Newton's Cradle Features:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Perfect energy conservation - perpetual motion</li>
                          <li>• 5 steel balls with identical mass and size</li>
                          <li>• String constraints with zero energy loss</li>
                          <li>• Mouse interaction - drag balls to lift them</li>
                          <li>• Real-time collision detection and momentum transfer</li>
                          <li>• Press 'R' key to reset the simulation</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Chemistry Simulations */}
          <TabsContent value="chemistry" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Available Simulations */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Available Simulations</h3>
                 {chemistrySimulations.map((sim, index) => {
                   const IconComponent = sim.icon;
                   return (
                      <Card 
                        key={index}
                        onClick={() => setActiveChemistrySim(index)}
                        className={`p-4 cursor-pointer transition-all duration-300 ${
                          sim.active 
                            ? 'bg-gradient-primary border-0 text-white shadow-glow' 
                            : 'bg-gradient-card border-glass-border hover:shadow-card'
                        }`}
                      >
                       <div className="flex items-center space-x-3">
                         <IconComponent className="w-5 h-5" />
                         <div>
                           <h4 className="font-medium">{sim.name}</h4>
                           <p className={`text-xs ${sim.active ? 'text-white/80' : 'text-muted-foreground'}`}>
                             {sim.description}
                           </p>
                         </div>
                       </div>
                       {sim.active && (
                         <Badge className="mt-2 bg-white/20 text-white border-0">Active</Badge>
                       )}
                     </Card>
                   );
                 })}
              </div>

              {/* Main Simulation Area */}
               <div className="lg:col-span-2">
                 <Card className="bg-gradient-card border-glass-border backdrop-blur-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">
                        {activeChemistrySim === 0 ? '3D Molecular Viewer' : '3D Atomic Structure'}
                      </h3>
                    </div>

                    {/* Chemistry Viewers */}
                    {activeChemistrySim === 0 && (
                      <MoleculeViewer 
                        isRunning={chemistryRunning} 
                      />
                    )}
                    {activeChemistrySim === 1 && (
                      <AtomViewer 
                        isRunning={chemistryRunning} 
                      />
                    )}
                 </Card>
               </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};