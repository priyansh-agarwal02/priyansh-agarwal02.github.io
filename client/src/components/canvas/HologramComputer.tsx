import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text3D, MeshTransmissionMaterial, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function HologramComputer() {
  const computerRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const globeRef = useRef<THREE.Mesh>(null);
  
  // Animation on component mount
  useEffect(() => {
    if (computerRef.current) {
      computerRef.current.rotation.y = -Math.PI / 5;
      computerRef.current.position.set(2, -0.5, 0);
    }
  }, []);
  
  // Continuous animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (computerRef.current) {
      computerRef.current.rotation.y = -Math.PI / 5 + Math.sin(time * 0.3) * 0.1;
    }
    
    if (screenRef.current && screenRef.current.material instanceof THREE.MeshStandardMaterial) {
      screenRef.current.material.emissiveIntensity = 1 + Math.sin(time * 2) * 0.2;
    }
    
    if (globeRef.current) {
      globeRef.current.rotation.y = time * 0.2;
      globeRef.current.rotation.z = time * 0.1;
    }
  });
  
  return (
    <group ref={computerRef}>
      {/* Base */}
      <mesh position={[0, -1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.2, 1.2]} />
        <meshStandardMaterial color="#151515" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Stand */}
      <mesh position={[0, -0.8, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 1.2, 16]} />
        <meshStandardMaterial color="#252525" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Monitor */}
      <group position={[0, 0.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#151515" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Screen */}
        <mesh 
          ref={screenRef} 
          position={[0, 0, 0.06]} 
          castShadow
        >
          <planeGeometry args={[2.8, 1.8]} />
          <meshStandardMaterial 
            color="#131b3a" 
            emissive="#6a74c9"
            emissiveIntensity={1.5}
          />
        </mesh>
        
        {/* AI Hologram */}
        <Float
          speed={2.5} 
          rotationIntensity={0.5} 
          floatIntensity={0.5}
          position={[0, 0, 0.5]}
        >
          <mesh ref={globeRef} scale={0.7}>
            <sphereGeometry args={[0.6, 32, 32]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.5}
              chromaticAberration={0.1}
              transmission={1}
              roughness={0}
              metalness={0}
              ior={1.5}
              color={"#915eff"}
            />
          </mesh>
          
          {/* Digital circuits/lines */}
          <group scale={0.1} position={[0, 0, 0]}>
            {[...Array(20)].map((_, i) => (
              <mesh key={i} position={[
                Math.sin(i * 0.5) * 5, 
                Math.cos(i * 0.5) * 5, 
                Math.sin(i * 0.3) * Math.cos(i * 0.2) * 5
              ]}>
                <boxGeometry args={[0.2, 0.2, Math.random() * 5 + 1]} />
                <MeshDistortMaterial
                  speed={4}
                  distort={0.2}
                  color={"#00ffff"}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            ))}
          </group>
        </Float>
        
        {/* Floating text */}
        <group position={[0, -0.6, 0.5]} scale={0.15}>
          <Float speed={5} floatIntensity={0.2}>
            <Text3D
              font="/fonts/Inter_Bold.json"
              size={1}
              height={0.1}
              curveSegments={12}
            >
              AI/ML
              <meshStandardMaterial 
                color={"#915eff"} 
                emissive={"#915eff"}
                emissiveIntensity={2}
              />
            </Text3D>
          </Float>
        </group>
      </group>
      
      {/* Keyboard */}
      <group position={[0, -1.3, 0.8]}>
        <mesh castShadow>
          <boxGeometry args={[2, 0.1, 0.8]} />
          <meshStandardMaterial color="#252525" metalness={0.5} roughness={0.4} />
        </mesh>
        
        {/* Keys */}
        <group position={[0, 0.08, 0]} scale={0.95}>
          {[...Array(6)].map((_, row) => (
            [...Array(12)].map((_, col) => (
              <mesh 
                key={`${row}-${col}`} 
                position={[
                  (col - 5.5) * 0.16, 
                  0, 
                  (row - 2.5) * 0.12
                ]}
                castShadow
              >
                <boxGeometry args={[0.14, 0.03, 0.1]} />
                <meshStandardMaterial 
                  color="#111111" 
                  metalness={0.5} 
                  roughness={0.8} 
                />
              </mesh>
            ))
          ))}
        </group>
      </group>
    </group>
  );
}