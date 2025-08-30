import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as THREE from 'three';

// N-Dimensional Hypercube Component with proper nD rotation
const NDimensionalHypercube = ({ dimensions }: { dimensions: number }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState(0);
  
  useFrame((state, delta) => {
    setTime(t => t + delta * 0.2);
    
    if (meshRef.current && dimensions >= 2) {
      // Clear previous geometry
      meshRef.current.clear();
      
      // Generate n-dimensional hypercube vertices
      const verticesND = [];
      const numVertices = Math.pow(2, dimensions);
      
      for (let i = 0; i < numVertices; i++) {
        const vertex = [];
        for (let d = 0; d < dimensions; d++) {
          vertex.push((i & (1 << d)) ? 1 : -1);
        }
        verticesND.push(vertex);
      }
      
      // Apply rotations in multiple 2D planes
      const rotatedVertices = verticesND.map(vertex => {
        let rotated = [...vertex];
        
        // Apply rotations in different 2D planes
        for (let plane = 0; plane < Math.min(6, Math.floor(dimensions * (dimensions - 1) / 4)); plane++) {
          const axis1 = (plane * 2) % dimensions;
          const axis2 = (plane * 2 + 1) % dimensions;
          
          if (axis1 !== axis2 && axis1 < dimensions && axis2 < dimensions) {
            const angle = time * (0.3 + plane * 0.1);
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            
            const x = rotated[axis1];
            const y = rotated[axis2];
            
            rotated[axis1] = x * cos - y * sin;
            rotated[axis2] = x * sin + y * cos;
          }
        }
        
        return rotated;
      });
      
      // Project to 3D space using successive perspective projections
      const projectedVertices = rotatedVertices.map(vertex => {
        let projected = vertex.slice(0, 3); // Start with first 3 dimensions
        
        // Project higher dimensions to 3D
        for (let d = 3; d < dimensions; d++) {
          const distance = 4;
          const w = vertex[d];
          const scale = distance / (distance - w);
          
          projected = projected.map(coord => coord * scale);
        }
        
        // Scale down for higher dimensions to prevent overcrowding
        const scaleFactor = Math.max(0.3, 1.5 / Math.sqrt(dimensions));
        return projected.map(coord => coord * scaleFactor);
      });
      
      // Generate edges based on hypercube connectivity
      const edges = [];
      for (let i = 0; i < numVertices; i++) {
        for (let j = i + 1; j < numVertices; j++) {
          // Two vertices are connected if they differ in exactly one bit
          let diff = i ^ j;
          let bitCount = 0;
          while (diff > 0) {
            if (diff & 1) bitCount++;
            diff >>= 1;
          }
          if (bitCount === 1) {
            edges.push([i, j]);
          }
        }
      }
      
      // Draw edges
      edges.forEach(([i, j]) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(projectedVertices[i][0], projectedVertices[i][1], projectedVertices[i][2]),
          new THREE.Vector3(projectedVertices[j][0], projectedVertices[j][1], projectedVertices[j][2])
        ]);
        const material = new THREE.LineBasicMaterial({ 
          color: new THREE.Color().setHSL((i + j) * 0.03 / dimensions, 0.8, 0.6),
          opacity: Math.max(0.3, 0.8 / Math.sqrt(dimensions)),
          transparent: true
        });
        const line = new THREE.Line(geometry, material);
        meshRef.current.add(line);
      });
      
      // Add vertices as small spheres
      projectedVertices.forEach((pos, i) => {
        const geometry = new THREE.SphereGeometry(Math.max(0.02, 0.05 / Math.sqrt(dimensions)), 6, 4);
        const material = new THREE.MeshBasicMaterial({ 
          color: new THREE.Color().setHSL(i * 0.02 / dimensions, 0.9, 0.7),
          opacity: Math.max(0.5, 0.9 / Math.sqrt(dimensions)),
          transparent: true
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(pos[0], pos[1], pos[2]);
        meshRef.current.add(sphere);
      });
    }
  });
  
  return <group ref={meshRef} scale={[0.8, 0.8, 0.8]} />;
};

// 0D Point Component
const ZeroDimension = () => (
  <group>
    <mesh>
      <sphereGeometry args={[0.1]} />
      <meshPhongMaterial color={new THREE.Color().setHSL(0, 0.8, 0.6)} wireframe />
    </mesh>
  </group>
);
const OneDimension = () => (
  <group>
    <mesh>
      <cylinderGeometry args={[0.02, 0.02, 4]} />
      <meshPhongMaterial color={new THREE.Color().setHSL(0.1, 0.8, 0.6)} wireframe />
    </mesh>
  </group>
);

const TwoDimension = () => (
  <group>
    <mesh>
      <planeGeometry args={[3, 3]} />
      <meshPhongMaterial color={new THREE.Color().setHSL(0.2, 0.8, 0.6)} side={THREE.DoubleSide} wireframe />
    </mesh>
    <mesh position={[-1.5, -1.5, 0]}>
      <sphereGeometry args={[0.08]} />
      <meshPhongMaterial color={new THREE.Color().setHSL(0.25, 0.8, 0.6)} wireframe />
    </mesh>
    <mesh position={[1.5, -1.5, 0]}>
      <sphereGeometry args={[0.08]} />
      <meshPhongMaterial color={new THREE.Color().setHSL(0.3, 0.8, 0.6)} wireframe />
    </mesh>
    <mesh position={[1.5, 1.5, 0]}>
      <sphereGeometry args={[0.08]} />
      <meshPhongMaterial color={new THREE.Color().setHSL(0.35, 0.8, 0.6)} wireframe />
    </mesh>
    <mesh position={[-1.5, 1.5, 0]}>
      <sphereGeometry args={[0.08]} />
      <meshPhongMaterial color={new THREE.Color().setHSL(0.4, 0.8, 0.6)} wireframe />
    </mesh>
    {/* Edges */}
    {[
      [[-1.5, -1.5, 0], [1.5, -1.5, 0]],
      [[1.5, -1.5, 0], [1.5, 1.5, 0]],
      [[1.5, 1.5, 0], [-1.5, 1.5, 0]],
      [[-1.5, 1.5, 0], [-1.5, -1.5, 0]]
    ].map((edge, i) => (
      <mesh key={i} position={[
        (edge[0][0] + edge[1][0]) / 2,
        (edge[0][1] + edge[1][1]) / 2,
        0
      ]} rotation={[0, 0, Math.atan2(edge[1][1] - edge[0][1], edge[1][0] - edge[0][0])]}>
        <cylinderGeometry args={[0.02, 0.02, Math.sqrt(Math.pow(edge[1][0] - edge[0][0], 2) + Math.pow(edge[1][1] - edge[0][1], 2))]} />
        <meshPhongMaterial color={new THREE.Color().setHSL(0.45 + i * 0.05, 0.8, 0.6)} />
      </mesh>
    ))}
  </group>
);

const ThreeDimension = () => (
  <group>
    <mesh>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshPhongMaterial color={new THREE.Color().setHSL(0.6, 0.8, 0.6)} wireframe />
    </mesh>
    {/* Vertices */}
    {[
      [-1.25, -1.25, -1.25], [1.25, -1.25, -1.25], [1.25, 1.25, -1.25], [-1.25, 1.25, -1.25],
      [-1.25, -1.25, 1.25], [1.25, -1.25, 1.25], [1.25, 1.25, 1.25], [-1.25, 1.25, 1.25]
    ].map((pos, i) => (
      <mesh key={i} position={[pos[0], pos[1], pos[2]]}>
        <sphereGeometry args={[0.08]} />
        <meshPhongMaterial color={new THREE.Color().setHSL(i * 0.08, 0.8, 0.6)} wireframe />
      </mesh>
    ))}
  </group>
);

interface DimensionsViewerProps {
  isRunning?: boolean;
}

export const DimensionsViewer: React.FC<DimensionsViewerProps> = ({ isRunning = true }) => {
  const [activeDimension, setActiveDimension] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11>(0);
  
  const dimensions = [
    { 
      value: 0 as const, 
      label: '0D', 
      name: 'Point',
      description: 'A zero-dimensional point with no length, width, or height. It represents position only.',
      properties: ['Position only', 'No extension in any direction', 'Fundamental geometric object']
    },
    { 
      value: 1 as const, 
      label: '1D', 
      name: 'Line',
      description: 'A one-dimensional line with length only. Points can only move along this single axis.',
      properties: ['Length', 'No width or height', 'Infinite thinness']
    },
    { 
      value: 2 as const, 
      label: '2D', 
      name: 'Square',
      description: 'A two-dimensional plane with length and width. Objects can move in any direction within this flat surface.',
      properties: ['Length and Width', 'No thickness', 'Area exists', 'Infinite thinness in 3rd dimension']
    },
    { 
      value: 3 as const, 
      label: '3D', 
      name: 'Cube',
      description: 'Our familiar three-dimensional space with length, width, and height. Objects have volume and can move in any direction.',
      properties: ['Length, Width, and Height', 'Volume exists', 'Physical space we experience', '8 vertices, 12 edges, 6 faces']
    },
    { 
      value: 4 as const, 
      label: '4D', 
      name: 'Tesseract (Hypercube)',
      description: 'A four-dimensional hypercube with length, width, height, and a fourth spatial dimension (ana/kata). This is a projection into our 3D space.',
      properties: ['4 spatial dimensions', '16 vertices, 32 edges, 24 faces, 8 cubes', 'Rotates through multiple 4D planes', 'Impossible to fully visualize in 3D']
    },
    { 
      value: 5 as const, 
      label: '5D', 
      name: 'Penteract (5-cube)',
      description: 'A five-dimensional hypercube. Rotates through 10 different 2D planes simultaneously.',
      properties: ['5 spatial dimensions', '32 vertices, 80 edges, 80 faces, 40 cubes, 10 tesseracts', '10 rotation planes', 'Hypervolume: l⁵']
    },
    { 
      value: 6 as const, 
      label: '6D', 
      name: 'Hexeract (6-cube)',
      description: 'A six-dimensional hypercube. Rotates through 15 different 2D planes simultaneously.',
      properties: ['6 spatial dimensions', '64 vertices, 192 edges, 240 faces, 160 cubes, 60 tesseracts, 12 penteracts', '15 rotation planes', 'Hypervolume: l⁶']
    },
    { 
      value: 7 as const, 
      label: '7D', 
      name: 'Hepteract (7-cube)',
      description: 'A seven-dimensional hypercube. Rotates through 21 different 2D planes simultaneously.',
      properties: ['7 spatial dimensions', '128 vertices, 448 edges, 672 faces, 560 cubes, 280 tesseracts, 84 penteracts, 14 hexeracts', '21 rotation planes', 'Hypervolume: l⁷']
    },
    { 
      value: 8 as const, 
      label: '8D', 
      name: 'Octeract (8-cube)',
      description: 'An eight-dimensional hypercube. Rotates through 28 different 2D planes simultaneously.',
      properties: ['8 spatial dimensions', '256 vertices, 1024 edges, 1792 faces, 1792 cubes, 1120 tesseracts, 448 penteracts, 112 hexeracts, 16 hepteracts', '28 rotation planes', 'Hypervolume: l⁸']
    },
    { 
      value: 9 as const, 
      label: '9D', 
      name: 'Enneract (9-cube)',
      description: 'A nine-dimensional hypercube. Rotates through 36 different 2D planes simultaneously.',
      properties: ['9 spatial dimensions', '512 vertices, 2304 edges, 4608 faces, 5376 cubes, 4032 tesseracts, 2016 penteracts, 672 hexeracts, 144 hepteracts, 18 octeracts', '36 rotation planes', 'Hypervolume: l⁹']
    },
    { 
      value: 10 as const, 
      label: '10D', 
      name: 'Decaact (10-cube)',
      description: 'A ten-dimensional hypercube. Rotates through 45 different 2D planes simultaneously.',
      properties: ['10 spatial dimensions', '1024 vertices, 5120 edges, 11520 faces, 15360 cubes, 13440 tesseracts, 8064 penteracts, 3360 hexeracts, 960 hepteracts, 180 octeracts, 20 enneracts', '45 rotation planes', 'Hypervolume: l¹⁰']
    },
    { 
      value: 11 as const, 
      label: '11D', 
      name: 'Hendecaact (11-cube)',
      description: 'An eleven-dimensional hypercube. Rotates through 55 different 2D planes simultaneously.',
      properties: ['11 spatial dimensions', '2048 vertices, 11264 edges, 28160 faces, 42240 cubes, 42240 tesseracts, 29568 penteracts, 14784 hexeracts, 5280 hepteracts, 1320 octeracts, 220 enneracts, 22 decaacts', '55 rotation planes', 'Hypervolume: l¹¹']
    }
  ];
  
  const renderDimension = () => {
    switch (activeDimension) {
      case 0:
        return <ZeroDimension />;
      case 1:
        return <OneDimension />;
      case 2:
        return <TwoDimension />;
      case 3:
        return <ThreeDimension />;
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
        return <NDimensionalHypercube dimensions={activeDimension} />;
      default:
        return <ZeroDimension />;
    }
  };
  
  const currentDim = dimensions.find(d => d.value === activeDimension)!;
  
  return (
    <div className="space-y-6">
      {/* Dimension Controls */}
      <div className="relative">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 pb-2 min-w-max">
            {dimensions.map((dim) => (
              <Button
                key={dim.value}
                variant={activeDimension === dim.value ? "default" : "outline"}
                onClick={() => setActiveDimension(dim.value)}
                className={`flex-shrink-0 ${
                  activeDimension === dim.value 
                    ? 'bg-gradient-primary text-white shadow-glow border-0' 
                    : 'border-glass-border hover:bg-accent'
                }`}
              >
                {dim.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Performance Warning for Higher Dimensions */}
      {activeDimension >= 4 && (
        <Card className="bg-gradient-to-r from-destructive/10 via-destructive/5 to-destructive/10 border-destructive/20 p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
            <div>
              <h4 className="font-semibold text-destructive mb-1">⚠️ Performance Warning</h4>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">{activeDimension}D hypercubes</span> generate <span className="text-destructive font-medium">{Math.pow(2, activeDimension)} vertices</span> and <span className="text-destructive font-medium">{activeDimension * Math.pow(2, activeDimension - 1)} edges</span> with complex n-dimensional rotations. 
                This may cause significant performance degradation or device instability on lower-end hardware.
              </p>
              <p className="text-xs text-destructive/80 mt-1">
                Recommended: Use dimensions ≤5D on mobile devices
              </p>
            </div>
          </div>
        </Card>
      )}
      
      {/* 3D Viewer */}
      <div className="h-96 bg-gradient-to-br from-background/80 to-muted/20 border border-glass-border rounded-xl relative overflow-hidden">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          {renderDimension()}
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={activeDimension >= 4} // Auto-rotate for 4D and above
            autoRotateSpeed={2}
          />
        </Canvas>
        
        {activeDimension >= 4 && (
          <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm border border-glass-border rounded-lg p-2">
            <div className="text-xs text-muted-foreground text-center">
              <div className="font-medium">{activeDimension}D Rotation Active</div>
              <div>{Math.floor(activeDimension * (activeDimension - 1) / 2)} rotation planes</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Dimension Information */}
      <Card className="bg-gradient-card border-glass-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-gradient-primary text-white border-0">
            {currentDim.label}
          </Badge>
          <span className="font-medium">{currentDim.name}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          {currentDim.description}
        </p>
        <div className="text-sm">
          <div className="font-medium mb-2">Properties:</div>
          <ul className="space-y-1">
            {currentDim.properties.map((prop, i) => (
              <li key={i} className="text-muted-foreground">• {prop}</li>
            ))}
          </ul>
        </div>
      </Card>
      
      {/* Mathematical Information */}
      <Card className="bg-gradient-card border-glass-border p-4">
        <h4 className="font-medium mb-2">Mathematical Properties</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-primary">Geometric Properties:</div>
            <div className="text-muted-foreground mt-1">
              {activeDimension === 0 && (
                <ul className="space-y-1">
                  <li>• No dimensions</li>
                  <li>• Position only</li>
                  <li>• No distance concept</li>
                </ul>
              )}
              {activeDimension === 1 && (
                <ul className="space-y-1">
                  <li>• Distance: |x₂ - x₁|</li>
                  <li>• Degrees of freedom: 1</li>
                  <li>• Neighbors: 2 maximum</li>
                </ul>
              )}
              {activeDimension === 2 && (
                <ul className="space-y-1">
                  <li>• Area: length × width</li>
                  <li>• Degrees of freedom: 2</li>
                  <li>• Euclidean distance: √[(x₂-x₁)² + (y₂-y₁)²]</li>
                </ul>
              )}
              {activeDimension === 3 && (
                <ul className="space-y-1">
                  <li>• Volume: length × width × height</li>
                  <li>• Degrees of freedom: 3</li>
                  <li>• Distance: √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]</li>
                </ul>
              )}
              {activeDimension >= 4 && (
                <ul className="space-y-1">
                  <li>• Hypervolume: l^{activeDimension}</li>
                  <li>• Degrees of freedom: {activeDimension}</li>
                  <li>• Distance: √[Σ(xᵢ₂-xᵢ₁)²] for i=1..{activeDimension}</li>
                  <li>• Rotation planes: {Math.floor(activeDimension * (activeDimension - 1) / 2)}</li>
                </ul>
              )}
            </div>
          </div>
          <div>
            <div className="font-medium text-secondary">Topological Properties:</div>
            <div className="text-muted-foreground mt-1">
              {activeDimension === 0 && (
                <ul className="space-y-1">
                  <li>• Vertices: 1</li>
                  <li>• No edges or faces</li>
                  <li>• Boundary: empty set</li>
                </ul>
              )}
              {activeDimension === 1 && (
                <ul className="space-y-1">
                  <li>• Vertices: 2</li>
                  <li>• Edges: 1</li>
                  <li>• Boundary: 0-dimensional points</li>
                </ul>
              )}
              {activeDimension === 2 && (
                <ul className="space-y-1">
                  <li>• Vertices: 4</li>
                  <li>• Edges: 4</li>
                  <li>• Faces: 1</li>
                  <li>• Boundary: 1-dimensional edges</li>
                </ul>
              )}
              {activeDimension === 3 && (
                <ul className="space-y-1">
                  <li>• Vertices: 8</li>
                  <li>• Edges: 12</li>
                  <li>• Faces: 6</li>
                  <li>• Boundary: 2-dimensional faces</li>
                </ul>
              )}
              {activeDimension >= 4 && (
                <ul className="space-y-1">
                  <li>• Vertices: {Math.pow(2, activeDimension)}</li>
                  <li>• Edges: {activeDimension * Math.pow(2, activeDimension - 1)}</li>
                  <li>• {activeDimension}D content: 1 hypercube</li>
                  <li>• Boundary: {Math.pow(2, activeDimension - 1)}-dimensional facets</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};