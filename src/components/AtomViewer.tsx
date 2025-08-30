import React, { useRef, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import * as THREE from 'three';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ATOMS = {
  'Hydrogen (H)': {
    protons: 1,
    neutrons: 0,
    electrons: 1,
    shells: [1],
    symbol: 'H',
    color: '#ffffff'
  },
  'Helium (He)': {
    protons: 2,
    neutrons: 2,
    electrons: 2,
    shells: [2],
    symbol: 'He',
    color: '#d9ffff'
  },
  'Carbon (C)': {
    protons: 6,
    neutrons: 6,
    electrons: 6,
    shells: [2, 4],
    symbol: 'C',
    color: '#909090'
  },
  'Nitrogen (N)': {
    protons: 7,
    neutrons: 7,
    electrons: 7,
    shells: [2, 5],
    symbol: 'N',
    color: '#3050f8'
  },
  'Oxygen (O)': {
    protons: 8,
    neutrons: 8,
    electrons: 8,
    shells: [2, 6],
    symbol: 'O',
    color: '#ff0d0d'
  },
  'Sodium (Na)': {
    protons: 11,
    neutrons: 12,
    electrons: 11,
    shells: [2, 8, 1],
    symbol: 'Na',
    color: '#ab5cf2'
  },
  'Aluminum (Al)': {
    protons: 13,
    neutrons: 14,
    electrons: 13,
    shells: [2, 8, 3],
    symbol: 'Al',
    color: '#bfa6a6'
  },
  'Chlorine (Cl)': {
    protons: 17,
    neutrons: 18,
    electrons: 17,
    shells: [2, 8, 7],
    symbol: 'Cl',
    color: '#1ff01f'
  },
  'Iron (Fe)': {
    protons: 26,
    neutrons: 30,
    electrons: 26,
    shells: [2, 8, 14, 2],
    symbol: 'Fe',
    color: '#e06633'
  },
  'Gold (Au)': {
    protons: 79,
    neutrons: 118,
    electrons: 79,
    shells: [2, 8, 18, 32, 18, 1],
    symbol: 'Au',
    color: '#ffd700'
  },
  'Oganesson (Og)': {
    protons: 118,
    neutrons: 176,
    electrons: 118,
    shells: [2, 8, 18, 32, 32, 18, 8],
    symbol: 'Og',
    color: '#c0c0c0'
  }
};

const Nucleus = ({ protons, neutrons }: { protons: number; neutrons: number }) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    }
  });

  // Arrange nucleus particles in a tight, perfect sphere formation
  const totalParticles = protons + neutrons;
  const nucleusRadius = Math.max(0.4, Math.pow(totalParticles, 1/3) * 0.2);
  const particles = [];

  // Create uniform distribution on sphere surface and interior
  const allParticles = [];
  
  // Add protons first
  for (let i = 0; i < protons; i++) {
    allParticles.push({ type: 'proton', index: i });
  }
  // Add neutrons
  for (let i = 0; i < neutrons; i++) {
    allParticles.push({ type: 'neutron', index: i });
  }

  // Distribute particles uniformly in a sphere
  allParticles.forEach((particle, i) => {
    const phi = Math.acos(1 - 2 * (i + 0.5) / totalParticles);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i; // Golden angle
    
    // Use concentric layers for better packing
    const layer = Math.floor(i / Math.min(8, totalParticles));
    const layerRadius = nucleusRadius * (0.3 + 0.7 * layer / Math.max(1, Math.ceil(totalParticles / 8)));
    
    const x = layerRadius * Math.sin(phi) * Math.cos(theta);
    const y = layerRadius * Math.sin(phi) * Math.sin(theta);
    const z = layerRadius * Math.cos(phi);

    if (particle.type === 'proton') {
      particles.push(
        <group key={`proton-${particle.index}`} position={[x, y, z]}>
          {/* Main proton sphere */}
          <mesh>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshPhongMaterial 
              color="#32ff32" 
              emissive="#32ff32" 
              emissiveIntensity={0.8}
              transparent
              opacity={0.95}
            />
          </mesh>
          {/* Inner glow */}
          <mesh>
            <sphereGeometry args={[0.22, 12, 12]} />
            <meshPhongMaterial 
              color="#64ff64" 
              emissive="#64ff64" 
              emissiveIntensity={0.4}
              transparent
              opacity={0.3}
            />
          </mesh>
          {/* Outer glow */}
          <mesh>
            <sphereGeometry args={[0.28, 8, 8]} />
            <meshPhongMaterial 
              color="#96ff96" 
              emissive="#96ff96" 
              emissiveIntensity={0.2}
              transparent
              opacity={0.1}
            />
          </mesh>
        </group>
      );
    } else {
      particles.push(
        <group key={`neutron-${particle.index}`} position={[x, y, z]}>
          {/* Main neutron sphere */}
          <mesh>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshPhongMaterial 
              color="#ff3232" 
              emissive="#ff3232" 
              emissiveIntensity={0.8}
              transparent
              opacity={0.95}
            />
          </mesh>
          {/* Inner glow */}
          <mesh>
            <sphereGeometry args={[0.22, 12, 12]} />
            <meshPhongMaterial 
              color="#ff6464" 
              emissive="#ff6464" 
              emissiveIntensity={0.4}
              transparent
              opacity={0.3}
            />
          </mesh>
          {/* Outer glow */}
          <mesh>
            <sphereGeometry args={[0.28, 8, 8]} />
            <meshPhongMaterial 
              color="#ff9696" 
              emissive="#ff9696" 
              emissiveIntensity={0.2}
              transparent
              opacity={0.1}
            />
          </mesh>
        </group>
      );
    }
  });

  return (
    <group ref={groupRef}>
      {particles}
    </group>
  );
};

const ElectronShell = ({ 
  radius, 
  electronCount, 
  shellIndex 
}: { 
  radius: number; 
  electronCount: number; 
  shellIndex: number; 
}) => {
  const shellRef = useRef<Group>(null);

  useFrame((state) => {
    if (shellRef.current) {
      // Different rotation speeds for different shells
      const speed = 0.5 + shellIndex * 0.2;
      shellRef.current.rotation.y = state.clock.elapsedTime * speed;
      shellRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  const electrons = [];
  for (let i = 0; i < electronCount; i++) {
    const angle = (i / electronCount) * 2 * Math.PI;
    // Add some orbital variation
    const orbitVariation = Math.sin(angle * 3) * 0.15;
    const x = Math.cos(angle) * (radius + orbitVariation);
    const z = Math.sin(angle) * (radius + orbitVariation);
    const y = Math.sin(angle * 2) * 0.2; // Reduced vertical variation

    electrons.push(
      <group key={`electron-${i}`} position={[x, y, z]}>
        {/* Main electron sphere */}
        <mesh>
          <sphereGeometry args={[0.12, 10, 10]} />
          <meshPhongMaterial 
            color="#32a8ff" 
            emissive="#32a8ff" 
            emissiveIntensity={0.9}
            transparent
            opacity={0.95}
          />
        </mesh>
        {/* Inner glow */}
        <mesh>
          <sphereGeometry args={[0.16, 8, 8]} />
          <meshPhongMaterial 
            color="#64c8ff" 
            emissive="#64c8ff" 
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>
        {/* Outer glow */}
        <mesh>
          <sphereGeometry args={[0.22, 6, 6]} />
          <meshPhongMaterial 
            color="#96d8ff" 
            emissive="#96d8ff" 
            emissiveIntensity={0.3}
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    );
  }

  // Glowing orbital path
  const points = [];
  for (let i = 0; i <= 128; i++) {
    const angle = (i / 128) * 2 * Math.PI;
    points.push(new Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <group ref={shellRef}>
      {electrons}
      {/* Main orbital ring */}
      <primitive 
        object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ 
          color: "#64c8ff", 
          transparent: true, 
          opacity: 0.4 
        }))} 
      />
      {/* Glowing orbital ring */}
      <primitive 
        object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ 
          color: "#32a8ff", 
          transparent: true, 
          opacity: 0.6,
          linewidth: 2
        }))} 
      />
    </group>
  );
};

const AtomStructure = ({ atomData }: { atomData: any }) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const shells = atomData.shells.map((electronCount: number, index: number) => {
    const radius = 1.8 + index * 1.0; // Closer shell spacing
    return (
      <ElectronShell
        key={index}
        radius={radius}
        electronCount={electronCount}
        shellIndex={index}
      />
    );
  });

  return (
    <group ref={groupRef} scale={[2, 2, 2]}>
      {/* Nucleus */}
      <Nucleus protons={atomData.protons} neutrons={atomData.neutrons} />
      
      {/* Electron shells */}
      {shells}
      
      {/* Atom label */}
      <Text
        position={[0, 0, 5]}
        fontSize={0.5}
        color={atomData.color}
        anchorX="center"
        anchorY="middle"
      >
        {atomData.symbol}
      </Text>
    </group>
  );
};

const LoadingAtom = ({ name }: { name: string }) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Text
        position={[0, 0, 0]}
        fontSize={0.3}
        color="#6366f1"
        anchorX="center"
        anchorY="middle"
      >
        Loading {name}...
      </Text>
      <mesh position={[0, -0.8, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshPhongMaterial color="#6366f1" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

interface AtomViewerProps {
  isRunning: boolean;
}

export const AtomViewer: React.FC<AtomViewerProps> = ({ isRunning }) => {
  const [selectedAtom, setSelectedAtom] = useState<string>('Hydrogen (H)');
  
  const handleAtomChange = useCallback((atom: string) => {
    setSelectedAtom(atom);
  }, []);

  const currentAtom = ATOMS[selectedAtom as keyof typeof ATOMS] || ATOMS['Hydrogen (H)'];
  
  return (
    <div className="relative">
      {/* Atom Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 font-mono">Select Atom</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {Object.keys(ATOMS).map((atom) => (
            <Button
              key={atom}
              variant={selectedAtom === atom ? "default" : "outline"}
              size="sm"
              onClick={() => handleAtomChange(atom)}
              className="text-xs font-mono"
            >
              {ATOMS[atom as keyof typeof ATOMS].symbol}
            </Button>
          ))}
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="bg-background/50 rounded-lg border border-glass-border h-96 mb-6 relative overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <pointLight position={[-10, -10, -5]} intensity={0.4} color="#4f46e5" />
          
          <Suspense fallback={<LoadingAtom name={selectedAtom} />}>
            <AtomStructure atomData={currentAtom} />
          </Suspense>
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={isRunning}
            autoRotateSpeed={0.5}
          />
        </Canvas>
        
        {/* Particle Legend */}
        <div className="absolute top-4 right-4 text-xs text-muted-foreground font-mono bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-glass-border">
          <div className="font-semibold mb-2 text-primary">Particles:</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_#32ff32]"></div>
              <span>Proton (+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_8px_#ff3232]"></div>
              <span>Neutron (0)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_#32a8ff]"></div>
              <span>Electron (-)</span>
            </div>
          </div>
        </div>

        {/* Current atom label */}
        <div className="absolute top-4 left-4 text-sm font-semibold font-mono bg-primary/90 text-primary-foreground rounded-lg px-3 py-2">
          {selectedAtom}
        </div>
      </div>
      
      {/* Atom Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-background/30 p-4 border-glass-border">
          <h4 className="font-medium mb-2 text-sm font-mono">
            Protons
          </h4>
          <p className="text-xl font-mono text-green-400">
            {currentAtom.protons}
          </p>
        </Card>
        
        <Card className="bg-background/30 p-4 border-glass-border">
          <h4 className="font-medium mb-2 text-sm font-mono">
            Neutrons
          </h4>
          <p className="text-xl font-mono text-red-400">{currentAtom.neutrons}</p>
        </Card>
        
        <Card className="bg-background/30 p-4 border-glass-border">
          <h4 className="font-medium mb-2 text-sm font-mono">
            Electrons
          </h4>
          <p className="text-xl font-mono text-blue-400">{currentAtom.electrons}</p>
        </Card>
        
        <Card className="bg-background/30 p-4 border-glass-border">
          <h4 className="font-medium mb-2 text-sm font-mono">
            Electron Shells
          </h4>
          <p className="text-xl font-mono text-primary">{currentAtom.shells.join(', ')}</p>
        </Card>
      </div>
    </div>
  );
};