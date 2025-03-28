import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";

interface ComputerModelProps {
  isMobile: boolean;
  scrollY: number;
}

const MacbookPro = ({ isMobile, scrollY }: ComputerModelProps) => {
  // References for animation
  const laptopRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const logoRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Animation effect
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (laptopRef.current) {
      // Base animation - subtle floating and rotation
      laptopRef.current.position.y = Math.sin(time * 0.5) * 0.05;
      
      // Add hover effect
      if (hovered) {
        // When hovered, tilt slightly to show keyboard better
        laptopRef.current.rotation.x = THREE.MathUtils.lerp(
          laptopRef.current.rotation.x,
          -0.2, 
          0.05
        );
        laptopRef.current.rotation.y = THREE.MathUtils.lerp(
          laptopRef.current.rotation.y,
          -0.3 - scrollY * 0.003,
          0.05
        );
      } else {
        // Normal position
        laptopRef.current.rotation.x = THREE.MathUtils.lerp(
          laptopRef.current.rotation.x,
          -0.1, 
          0.05
        );
        laptopRef.current.rotation.y = THREE.MathUtils.lerp(
          laptopRef.current.rotation.y,
          -0.2 - scrollY * 0.003 + Math.sin(time * 0.3) * 0.05,
          0.05
        );
      }
    }
    
    if (screenRef.current && screenRef.current.material instanceof THREE.MeshStandardMaterial) {
      // Make the screen "pulse" with light
      screenRef.current.material.emissiveIntensity = 0.9 + Math.sin(time * 1.5) * 0.1;
    }
    
    if (logoRef.current && logoRef.current.material instanceof THREE.MeshStandardMaterial) {
      // Animate logo glow
      logoRef.current.material.emissiveIntensity = 0.7 + Math.sin(time * 0.8) * 0.3;
    }
  });

  return (
    <group 
      ref={laptopRef} 
      position={[0, isMobile ? -1.2 : -1.0, 0]} 
      scale={isMobile ? 0.4 : 0.55}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Base - Aluminum unibody */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.15, 2]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Rounded edges for base */}
      {[
        [1.5, 0, 1] as [number, number, number], 
        [-1.5, 0, 1] as [number, number, number], 
        [1.5, 0, -1] as [number, number, number], 
        [-1.5, 0, -1] as [number, number, number]
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow receiveShadow>
          <sphereGeometry args={[0.05, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      
      {/* Keyboard area */}
      <mesh receiveShadow castShadow position={[0, 0.08, 0]}>
        <boxGeometry args={[2.8, 0.01, 1.8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Touchpad */}
      <mesh receiveShadow castShadow position={[0, 0.085, 0.6]}>
        <boxGeometry args={[1.2, 0.01, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Keys - MacBook style keyboard */}
      <group position={[0, 0.09, -0.2]}>
        {Array.from({ length: 6 * 14 }).map((_, i) => {
          const row = Math.floor(i / 14);
          const col = i % 14;
          return (
            <mesh 
              key={i} 
              position={[(col - 6.5) * 0.19, 0.01, (row - 2.5) * 0.19]}
              castShadow
            >
              <boxGeometry args={[0.17, 0.01, 0.17]} />
              <meshStandardMaterial 
                color="#1a1a1a" 
                metalness={0.6}
                roughness={0.3}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Laptop lid/screen (slightly tilted back) */}
      <group position={[0, 0.08, -1]} rotation={[Math.PI / 4, 0, 0]}>
        {/* Screen outer frame (Aluminum) */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[3, 2, 0.05]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Black screen bezel */}
        <mesh receiveShadow castShadow position={[0, 0, 0.03]}>
          <boxGeometry args={[2.9, 1.9, 0.01]} />
          <meshStandardMaterial color="#000000" metalness={0.1} roughness={0.5} />
        </mesh>
        
        {/* Actual screen (bright white) */}
        <mesh receiveShadow castShadow position={[0, 0, 0.04]} ref={screenRef}>
          <planeGeometry args={[2.7, 1.7]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.9}
          />
        </mesh>
        
        {/* MacBook camera notch */}
        <mesh position={[0, 0.9, 0.04]}>
          <boxGeometry args={[0.15, 0.03, 0.01]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Text on screen - AI-themed */}
        <Text
          position={[0, 0.2, 0.05]}
          fontSize={0.15}
          color="#000000"
          font="/fonts/Inter_Bold.json"
          anchorX="center"
          anchorY="middle"
        >
          AI IS THE FUTURE
        </Text>
        
        {/* Code snippet on screen */}
        <Text
          position={[0, -0.2, 0.05]}
          fontSize={0.08}
          color="#000000"
          font="/fonts/Inter_Bold.json"
          anchorX="center"
          anchorY="middle"
        >
          {`function trainAI() {\n  const model = new LLM();\n  model.optimize(); \n  return model;\n}`}
        </Text>
      </group>
      
      {/* Apple logo on lid back (glowing) */}
      <mesh 
        ref={logoRef}
        position={[0, 0.08, -0.95]} 
        rotation={[Math.PI / 4, 0, 0]}
      >
        <planeGeometry args={[0.4, 0.5]} />
        <meshStandardMaterial 
          color="#915eff"
          emissive="#915eff"
          emissiveIntensity={0.8}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

// Laptop model wrapper
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
  
  // Log visibility of the component
  useEffect(() => {
    console.log("3D Laptop component rendered");
  }, []);
  
  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      style={{ 
        position: "absolute", 
        width: "100%", 
        height: "100%", 
        zIndex: 1 
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[5, 5, 5]}
          castShadow
          shadow-mapSize={1024}
          intensity={1.5}
        />
        <pointLight position={[0, 0, 3]} intensity={1} color="#915eff" />
        <MacbookPro isMobile={isMobile} scrollY={scrollY} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;