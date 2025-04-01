import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

interface AIRobotProps {
  scale?: number;
}

const AIRobot = ({ scale = 2.5 }: AIRobotProps) => {
  const robotRef = useRef<THREE.Group>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  
  // Load the AI robot model
  const { scene: robotModel } = useGLTF('/models/ai_robot.glb') as GLTF & {
    scene: THREE.Group
  };
  
  // Preload the model
  useGLTF.preload('/models/ai_robot.glb');
  
  // Update loading state
  useEffect(() => {
    if (robotModel) {
      setModelLoaded(true);
      console.log("AI robot model loaded successfully");
      
      // Apply materials for better visibility
      robotModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Enhance material properties
          if (child.material) {
            child.material.roughness = 0.3;
            child.material.metalness = 0.7;
          }
          
          // Enable shadows
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [robotModel]);
  
  // Animation
  useFrame(({ clock }) => {
    if (robotRef.current) {
      const time = clock.getElapsedTime();
      
      // Floating animation
      robotRef.current.position.y = Math.sin(time * 0.8) * 0.1;
      
      // Gentle rotation
      robotRef.current.rotation.y = time * 0.3;
    }
  });
  
  return (
    <group ref={robotRef} position={[0, 0, 0]} scale={scale}>
      {modelLoaded ? (
        <primitive object={robotModel.clone()} />
      ) : (
        // Fallback while loading
        <mesh>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#4285F4" roughness={0.3} metalness={0.7} />
        </mesh>
      )}
    </group>
  );
};

export default AIRobot;