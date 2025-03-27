import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ComputerModelProps {
  isMobile: boolean;
  scrollY: number;
}

const ComputerModel = ({ isMobile, scrollY }: ComputerModelProps) => {
  // Simple geometries for a stylized desktop computer
  const computerRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  
  // Animation effect
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (computerRef.current) {
      // Make the computer slightly hover and rotate
      computerRef.current.position.y = Math.sin(time * 0.5) * 0.05;
      computerRef.current.rotation.y = -0.2 - scrollY * 0.005 + Math.sin(time * 0.3) * 0.05;
    }
    
    if (screenRef.current && screenRef.current.material instanceof THREE.MeshStandardMaterial) {
      // Make the screen "pulse" with light
      screenRef.current.material.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.2;
    }
  });

  return (
    <group ref={computerRef} position={[0, isMobile ? -1.5 : -1.4, 0]} scale={isMobile ? 0.5 : 0.7}>
      {/* Base/Stand */}
      <mesh receiveShadow castShadow position={[0, -0.95, 0]}>
        <boxGeometry args={[1.5, 0.1, 1]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Stand neck */}
      <mesh receiveShadow castShadow position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
        <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Monitor */}
      <group position={[0, 0.3, 0]}>
        {/* Monitor frame */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[3, 1.7, 0.1]} />
          <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Screen */}
        <mesh receiveShadow castShadow position={[0, 0, 0.06]} ref={screenRef}>
          <planeGeometry args={[2.8, 1.5]} />
          <meshStandardMaterial 
            color="#050a24"
            emissive="#4a5af5"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
      
      {/* Keyboard */}
      <group position={[0, -0.7, 0.8]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2, 0.1, 0.6]} />
          <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.4} />
        </mesh>
        
        {/* Keys (simplified) */}
        <group position={[0, 0.07, 0]}>
          {Array.from({ length: 12 * 5 }).map((_, i) => {
            const row = Math.floor(i / 12);
            const col = i % 12;
            return (
              <mesh 
                key={i} 
                position={[(col - 5) * 0.15, 0, (row - 2) * 0.1]}
                castShadow
              >
                <boxGeometry args={[0.13, 0.03, 0.08]} />
                <meshStandardMaterial color="#222222" />
              </mesh>
            );
          })}
        </group>
      </group>
    </group>
  );
};

// Computer model wrapper
const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    // Set the initial value of the 'isMobile' state variable
    setIsMobile(mediaQuery.matches);
    
    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    
    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    
    // Handle scroll for rotation
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <OrbitControls 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          castShadow
          shadow-mapSize={1024}
          intensity={1}
        />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#915eff" />
        <ComputerModel isMobile={isMobile} scrollY={scrollY} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;