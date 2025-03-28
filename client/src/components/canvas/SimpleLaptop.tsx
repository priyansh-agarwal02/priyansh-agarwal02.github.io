import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";

const SimpleLaptop = () => {
  const laptopRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  
  // Log when component mounts
  useEffect(() => {
    console.log("SimpleLaptop model initialized");
  }, []);
  
  // Simple animation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (laptopRef.current) {
      // Floating animation
      laptopRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      
      // Slight rotation
      laptopRef.current.rotation.y = Math.sin(time * 0.3) * 0.1 - 0.2;
    }
    
    if (screenRef.current && screenRef.current.material instanceof THREE.MeshStandardMaterial) {
      // Screen glow pulsate
      screenRef.current.material.emissiveIntensity = 0.7 + Math.sin(time * 1.5) * 0.3;
    }
  });
  
  return (
    <group ref={laptopRef} position={[0, 0, 0]} rotation={[0, -0.2, 0]}>
      {/* Base */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Screen */}
      <group position={[0, 0.1, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Screen display */}
        <mesh position={[0, 0, 0.06]} ref={screenRef}>
          <planeGeometry args={[2.8, 1.8]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#915eff" 
            emissiveIntensity={0.7} 
          />
        </mesh>
        
        {/* Text on screen */}
        <Text
          position={[0, 0.4, 0.07]}
          fontSize={0.3}
          color="#000000"
          font="/fonts/Inter_Bold.json"
          anchorX="center"
          anchorY="middle"
        >
          AI IS THE FUTURE
        </Text>
        
        {/* Code on screen */}
        <Text
          position={[0, -0.3, 0.07]}
          fontSize={0.1}
          color="#000000"
          font="/fonts/Inter_Bold.json"
          anchorX="center"
          anchorY="middle"
        >
          {`function trainAI() {\n  const model = new LLM();\n  model.train();\n  return model;\n}`}
        </Text>
      </group>
      
      {/* Logo on back */}
      <mesh position={[0, 0.1, -0.9]} rotation={[Math.PI / 4, 0, 0]}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial 
          color="#915eff" 
          emissive="#915eff" 
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
};

export default SimpleLaptop;