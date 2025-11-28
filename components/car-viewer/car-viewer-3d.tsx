"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Team } from "@/lib/data/teams";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Maximize2, Palette } from "lucide-react";
import { useState, useRef } from "react";

interface CarViewer3DProps {
  team: Team;
}

// Simple F1 Car Mesh Component
function F1CarMesh({ color }: { color: string }) {
  return (
    <group>
      {/* Main Body */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2, 0.4, 4]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Front Wing */}
      <mesh position={[0, 0.1, -2.2]}>
        <boxGeometry args={[2.5, 0.1, 0.3]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rear Wing */}
      <mesh position={[0, 0.8, 2]}>
        <boxGeometry args={[2, 0.6, 0.1]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Wheels */}
      {[
        [-0.8, 0, -1.5],
        [0.8, 0, -1.5],
        [-0.8, 0, 1.5],
        [0.8, 0, 1.5],
      ].map((position, i) => (
        <mesh key={i} position={position as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}

      {/* Halo */}
      <mesh position={[0, 0.9, -0.5]}>
        <torusGeometry args={[0.4, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

const CarViewer3D = ({ team }: CarViewer3DProps) => {
  const [currentColor, setCurrentColor] = useState(team.colors.primary);
  const controlsRef = useRef<any>(null);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <Card className="overflow-hidden">
      <div
        className="p-4 border-b"
        style={{ backgroundColor: team.colors.primary + "15" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">360° Car Viewer</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetCamera}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Maximize2 className="h-4 w-4" />
              Fullscreen
            </Button>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="relative h-[600px] bg-gradient-to-b from-gray-900 to-black">
        <Canvas>
          <PerspectiveCamera makeDefault position={[5, 3, 5]} />
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={15}
          />

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <pointLight position={[0, 5, 0]} intensity={0.5} />

          {/* Environment */}
          <Environment preset="sunset" />

          {/* F1 Car */}
          <F1CarMesh color={currentColor} />

          {/* Grid Floor */}
          <gridHelper args={[20, 20, team.colors.primary, "#333333"]} />
        </Canvas>

        {/* Controls Hint */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-muted-foreground text-center">
              🖱️ Click and drag to rotate • Scroll to zoom • Right-click to pan
            </p>
          </div>
        </div>
      </div>

      {/* Color Customization */}
      <div className="p-6 border-t">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="h-5 w-5" />
          <h3 className="font-semibold">Customize Livery</h3>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentColor(team.colors.primary)}
            className="w-12 h-12 rounded-lg border-2 hover:scale-110 transition-transform"
            style={{
              backgroundColor: team.colors.primary,
              borderColor: currentColor === team.colors.primary ? "#fff" : "transparent",
            }}
          />
          <button
            onClick={() => setCurrentColor(team.colors.secondary)}
            className="w-12 h-12 rounded-lg border-2 hover:scale-110 transition-transform"
            style={{
              backgroundColor: team.colors.secondary,
              borderColor: currentColor === team.colors.secondary ? "#fff" : "transparent",
            }}
          />
          <button
            onClick={() => setCurrentColor(team.colors.accent)}
            className="w-12 h-12 rounded-lg border-2 hover:scale-110 transition-transform"
            style={{
              backgroundColor: team.colors.accent,
              borderColor: currentColor === team.colors.accent ? "#fff" : "transparent",
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default CarViewer3D;