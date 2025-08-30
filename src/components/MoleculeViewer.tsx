import React, { useRef, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Mesh } from 'three';
import * as THREE from 'three';
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader.js';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MOLECULES = {
  'Water (H₂O)': 'water',
  'Aspirin': 'aspirin.pdb',
  'Ethanol': 'ethanol.pdb',
  'Nicotine': 'nicotine.pdb',
  'Glucose': 'glucose.pdb',
  'Cholesterol': 'cholesterol.pdb',
  'Buckyball': 'buckyball.pdb',
  'Salt (NaCl)': 'nacl.pdb',
  'Copper': 'cu.pdb'
};

const WaterMolecule = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={[2, 2, 2]}>
      {/* Oxygen atom (red) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhongMaterial color="#ff4444" shininess={100} />
      </mesh>
      
      {/* Hydrogen atoms (white) */}
      <mesh position={[-1.2, -0.8, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshPhongMaterial color="#ffffff" shininess={100} />
      </mesh>
      
      <mesh position={[1.2, -0.8, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshPhongMaterial color="#ffffff" shininess={100} />
      </mesh>
      
      {/* Bonds (cylinders) */}
      <mesh position={[-0.6, -0.4, 0]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
        <meshPhongMaterial color="#888888" />
      </mesh>
      
      <mesh position={[0.6, -0.4, 0]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
        <meshPhongMaterial color="#888888" />
      </mesh>
      
      {/* Atom labels */}
      <Text
        position={[0, 0.3, 0.8]}
        fontSize={0.3}
        color="red"
        anchorX="center"
        anchorY="middle"
      >
        O
      </Text>
      
      <Text
        position={[-1.2, -0.5, 0.8]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        H
      </Text>
      
      <Text
        position={[1.2, -0.5, 0.8]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        H
      </Text>
    </group>
  );
};

const PDBMolecule = ({ filename }: { filename: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const pdb = useLoader(PDBLoader, `/models/pdb/${filename}`);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  if (!pdb || !pdb.geometryAtoms) {
    return null;
  }

  // Get atom and bond geometry from PDB
  const atomsGeometry = pdb.geometryAtoms;
  const bondsGeometry = pdb.geometryBonds;
  
  // Center the molecule
  atomsGeometry.computeBoundingBox();
  const center = new THREE.Vector3();
  atomsGeometry.boundingBox!.getCenter(center);
  atomsGeometry.translate(-center.x, -center.y, -center.z);
  if (bondsGeometry) {
    bondsGeometry.translate(-center.x, -center.y, -center.z);
  }

  // Scale factor for better visualization
  const scaleFactor = 8;

  return (
    <group ref={groupRef} scale={[scaleFactor, scaleFactor, scaleFactor]}>
      {/* Render atoms as proper spheres */}
      {atomsGeometry.getAttribute('position') && (
        <group>
          {Array.from({ length: atomsGeometry.getAttribute('position').count }, (_, i) => {
            const position = new THREE.Vector3();
            position.fromBufferAttribute(atomsGeometry.getAttribute('position'), i);
            
            const color = new THREE.Color();
            if (atomsGeometry.getAttribute('color')) {
              color.fromBufferAttribute(atomsGeometry.getAttribute('color'), i);
            } else {
              color.setHex(0x888888);
            }

            // Atom size based on element type (from PDB data)
            let atomRadius = 0.3;
            if (pdb.json && pdb.json.atoms && pdb.json.atoms[i]) {
              const element = pdb.json.atoms[i][4];
              // Different sizes for different elements
              switch(element) {
                case 'H': atomRadius = 0.2; break;
                case 'C': atomRadius = 0.3; break;
                case 'N': atomRadius = 0.28; break;
                case 'O': atomRadius = 0.32; break;
                case 'S': atomRadius = 0.4; break;
                default: atomRadius = 0.3;
              }
            }

            return (
              <mesh key={i} position={[position.x, position.y, position.z]}>
                <sphereGeometry args={[atomRadius, 12, 12]} />
                <meshPhongMaterial 
                  color={color} 
                  shininess={100}
                />
              </mesh>
            );
          })}
        </group>
      )}
      
      {/* Render bonds as cylinders for better visualization */}
      {bondsGeometry && bondsGeometry.getAttribute('position') && (
        <group>
          {Array.from({ length: bondsGeometry.getAttribute('position').count / 2 }, (_, i) => {
            const start = new THREE.Vector3();
            const end = new THREE.Vector3();
            start.fromBufferAttribute(bondsGeometry.getAttribute('position'), i * 2);
            end.fromBufferAttribute(bondsGeometry.getAttribute('position'), i * 2 + 1);
            
            const direction = new THREE.Vector3().subVectors(end, start);
            const length = direction.length();
            const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
            
            // Calculate rotation to align cylinder with bond direction
            const up = new THREE.Vector3(0, 1, 0);
            const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction.normalize());

            return (
              <mesh 
                key={i} 
                position={[midpoint.x, midpoint.y, midpoint.z]}
                quaternion={quaternion}
              >
                <cylinderGeometry args={[0.05, 0.05, length, 6]} />
                <meshPhongMaterial color="#666666" />
              </mesh>
            );
          })}
        </group>
      )}
    </group>
  );
};

const LoadingMolecule = ({ name }: { name: string }) => {
  const groupRef = useRef<THREE.Group>(null);

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

interface MoleculeViewerProps {
  isRunning: boolean;
}

export const MoleculeViewer: React.FC<MoleculeViewerProps> = ({ isRunning }) => {
  const [selectedMolecule, setSelectedMolecule] = useState<string>('Water (H₂O)');
  
  const handleMoleculeChange = useCallback((molecule: string) => {
    setSelectedMolecule(molecule);
  }, []);

  const moleculeData = {
    'Water (H₂O)': {
      formula: 'H₂O',
      bondAngle: '104.5°',
      molarMass: '18.016 g/mol',
      geometry: 'Bent'
    },
    'Aspirin': {
      formula: 'C₉H₈O₄',
      bondAngle: '120°',
      molarMass: '180.16 g/mol',
      geometry: 'Aromatic'
    },
    'Ethanol': {
      formula: 'C₂H₆O',
      bondAngle: '109.5°',
      molarMass: '46.07 g/mol',
      geometry: 'Tetrahedral'
    },
    'Nicotine': {
      formula: 'C₁₀H₁₄N₂',
      bondAngle: '120°',
      molarMass: '162.23 g/mol',
      geometry: 'Complex'
    },
    'Glucose': {
      formula: 'C₆H₁₂O₆',
      bondAngle: '109.5°',
      molarMass: '180.16 g/mol',
      geometry: 'Cyclic'
    },
    'Cholesterol': {
      formula: 'C₂₇H₄₆O',
      bondAngle: '109.5°',
      molarMass: '386.65 g/mol',
      geometry: 'Steroid'
    },
    'Buckyball': {
      formula: 'C₆₀',
      bondAngle: '120°',
      molarMass: '720.66 g/mol',
      geometry: 'Spherical'
    },
    'Salt (NaCl)': {
      formula: 'NaCl',
      bondAngle: 'Ionic',
      molarMass: '58.44 g/mol',
      geometry: 'Cubic'
    },
    'Copper': {
      formula: 'Cu',
      bondAngle: 'Metallic',
      molarMass: '63.55 g/mol',
      geometry: 'FCC Lattice'
    }
  };

  const currentStats = moleculeData[selectedMolecule as keyof typeof moleculeData] || moleculeData['Water (H₂O)'];
  
  return (
    <div className="relative">
      {/* Molecule Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 font-mono">Select Molecule</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.keys(MOLECULES).map((molecule) => (
            <Button
              key={molecule}
              variant={selectedMolecule === molecule ? "default" : "outline"}
              size="sm"
              onClick={() => handleMoleculeChange(molecule)}
              className="text-xs font-mono"
            >
              {molecule}
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
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
          
          <Suspense fallback={<LoadingMolecule name={selectedMolecule} />}>
            {selectedMolecule === 'Water (H₂O)' ? (
              <WaterMolecule />
            ) : (
              <PDBMolecule filename={MOLECULES[selectedMolecule as keyof typeof MOLECULES]} />
            )}
          </Suspense>
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={isRunning}
            autoRotateSpeed={1}
          />
        </Canvas>
        
        {/* Color Legend */}
        <div className="absolute top-4 right-4 text-xs text-muted-foreground font-mono bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-glass-border">
          <div className="font-semibold mb-2 text-primary">Atom Colors:</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white border border-gray-400"></div>
              <span>H - Hydrogen</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-800"></div>
              <span>C - Carbon</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>O - Oxygen</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>N - Nitrogen</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>S - Sulfur</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <span>Cl - Chlorine</span>
            </div>
          </div>
        </div>

        {/* Current molecule label */}
        <div className="absolute top-4 left-4 text-sm font-semibold font-mono bg-primary/90 text-primary-foreground rounded-lg px-3 py-2">
          {selectedMolecule}
        </div>
      </div>
      
      {/* Molecule Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-background/30 p-4 border-glass-border">
          <h4 className="font-medium mb-2 text-sm font-mono">
            Formula
          </h4>
          <p className="text-xl font-mono text-primary">
            {currentStats.formula}
          </p>
        </Card>
        
        <Card className="bg-background/30 p-4 border-glass-border">
          <h4 className="font-medium mb-2 text-sm font-mono">
            Bond Angle
          </h4>
          <p className="text-xl font-mono text-secondary">{currentStats.bondAngle}</p>
        </Card>
        
        <Card className="bg-background/30 p-4 border-glass-border">
          <h4 className="font-medium mb-2 text-sm font-mono">
            Molar Mass
          </h4>
          <p className="text-xl font-mono text-accent">{currentStats.molarMass}</p>
        </Card>
        
        <Card className="bg-background/30 p-4 border-glass-border">
          <h4 className="font-medium mb-2 text-sm font-mono">
            Geometry
          </h4>
          <p className="text-xl font-mono text-primary">{currentStats.geometry}</p>
        </Card>
      </div>
    </div>
  );
};