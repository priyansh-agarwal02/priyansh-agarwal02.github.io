import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Preload } from '@react-three/drei';
import { gsap } from 'gsap';

// Tech icons model - simplified version
const Icon = ({ icon, position, rotation, color }) => {
  const meshRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  
  // Animate on hover
  useEffect(() => {
    if (meshRef.current) {
      if (hovered) {
        gsap.to(meshRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 });
      } else {
        gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
      }
    }
  }, [hovered]);
  
  // Continuous rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.6}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={hovered ? 0.5 : 0.2}
      />
    </mesh>
  );
};

// Creates a grid of icons
const TechIconsGrid = () => {
  // Tech stacks with their colors
  const techStacks = [
    { name: "Python", color: "#3776AB" },
    { name: "TensorFlow", color: "#FF6F00" },
    { name: "PyTorch", color: "#EE4C2C" },
    { name: "LangChain", color: "#00BFFF" },
    { name: "Hugging Face", color: "#FFD700" },
    { name: "AWS", color: "#FF9900" },
    { name: "React", color: "#61DAFB" },
    { name: "Node.js", color: "#339933" },
    { name: "Docker", color: "#2496ED" },
    { name: "Kubernetes", color: "#326CE5" },
    { name: "SQL", color: "#4479A1" },
    { name: "NoSQL", color: "#4DB33D" }
  ];

  const groupRef = useRef();
  
  // Subtle group animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  // Calculate positions in a circular pattern
  const radius = 6;
  const iconPositions = techStacks.map((_, index) => {
    const angle = (index / techStacks.length) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    return [x, 0, z];
  });

  return (
    <group ref={groupRef}>
      {techStacks.map((tech, index) => (
        <Icon 
          key={tech.name}
          icon={tech.name}
          position={iconPositions[index]}
          rotation={[0, Math.random() * Math.PI, 0]}
          color={tech.color}
        />
      ))}
    </group>
  );
};

const TechIcons = () => {
  return (
    <div className="w-full h-[500px]">
      <Canvas
        shadows
        camera={{ position: [0, 10, 10], fov: 45 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024} 
        />
        <spotLight position={[-10, 10, -5]} intensity={1} />
        
        <TechIconsGrid />
        
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default TechIcons;
