import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";

interface ComputerModelProps {
  isMobile: boolean;
  scrollY: number;
}

const GamingLaptop = ({ isMobile, scrollY }: ComputerModelProps) => {
  // References for animation
  const laptopRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
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
      screenRef.current.material.emissiveIntensity = 0.7 + Math.sin(time * 1.5) * 0.3;
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
      {/* Base - lower part of laptop */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Keyboard area - indented */}
      <mesh receiveShadow castShadow position={[0, 0.11, 0]}>
        <boxGeometry args={[2.8, 0.02, 1.8]} />
        <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Touchpad */}
      <mesh receiveShadow castShadow position={[0, 0.12, 0.7]}>
        <boxGeometry args={[1, 0.01, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Keys - colorful gaming keyboard */}
      <group position={[0, 0.12, 0]}>
        {Array.from({ length: 6 * 12 }).map((_, i) => {
          const row = Math.floor(i / 12);
          const col = i % 12;
          // Rainbow color effect for gaming feel
          const hue = (col / 12) * 360;
          const color = new THREE.Color().setHSL(hue/360, 0.7, 0.5);
          
          return (
            <mesh 
              key={i} 
              position={[(col - 5.5) * 0.22, 0.01, (row - 3) * 0.15]}
              castShadow
            >
              <boxGeometry args={[0.19, 0.02, 0.12]} />
              <meshStandardMaterial 
                color={hovered ? color : "#333333"} 
                emissive={hovered ? color : "#000000"}
                emissiveIntensity={hovered ? 0.5 : 0}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Laptop lid/screen (slightly tilted back) */}
      <group position={[0, 0.1, -1]} rotation={[Math.PI / 4, 0, 0]}>
        {/* Screen outer frame */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Screen inner frame */}
        <mesh receiveShadow castShadow position={[0, 0, 0.06]}>
          <boxGeometry args={[2.9, 1.9, 0.01]} />
          <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.2} />
        </mesh>
        
        {/* Actual screen */}
        <mesh receiveShadow castShadow position={[0, 0, 0.07]} ref={screenRef}>
          <planeGeometry args={[2.7, 1.7]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.7}
          />
        </mesh>
        
        {/* Text on screen */}
        <Text
          position={[0, 0, 0.08]}
          fontSize={0.2}
          color="#000000"
          font="/fonts/Inter_Bold.json"
          anchorX="center"
          anchorY="middle"
        >
          AI IS THE FUTURE
        </Text>
      </group>
      
      {/* Exhaust vents on sides */}
      {[1.4, -1.4].map((x, i) => (
        <mesh key={i} position={[x, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      ))}
      
      {/* Logo on lid back (visible when lid closed) */}
      <mesh position={[0, 0.1, -0.95]} rotation={[Math.PI / 4, 0, 0]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#915eff" : "#4a5af5"} 
          emissive={hovered ? "#915eff" : "#4a5af5"}
          emissiveIntensity={0.8} 
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
        <GamingLaptop isMobile={isMobile} scrollY={scrollY} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;