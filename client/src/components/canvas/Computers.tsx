import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

interface ComputerModelProps {
  isMobile: boolean;
  scrollY: number;
}

// Basic geometric shapes to represent a stylized workstation
const ComputerModel = ({ isMobile, scrollY }: ComputerModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const monitorGroupRef = useRef<THREE.Group>(null);
  const keyboardRef = useRef<THREE.Mesh>(null);
  const cpuGroupRef = useRef<THREE.Group>(null);
  
  // Setup initial animation
  useEffect(() => {
    if (groupRef.current) {
      gsap.from(groupRef.current.position, {
        y: -5,
        duration: 2,
        ease: "elastic.out(1, 0.3)"
      });
      
      gsap.from(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "power3.out"
      });
    }
  }, []);
  
  // Animate based on scroll
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        y: scrollY * 0.01,
        duration: 0.8,
        ease: "power1.out"
      });
    }
  }, [scrollY]);
  
  // Continuous subtle animation
  useFrame((state, delta) => {
    if (monitorGroupRef.current) {
      monitorGroupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
    }
    if (keyboardRef.current) {
      keyboardRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.02 - 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, isMobile ? -3 : -2.5, 0]} scale={isMobile ? 0.5 : 0.6}>
      {/* Base/Desk */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[5, 0.1, 2.5]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Monitor */}
      <group ref={monitorGroupRef}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[3, 1.8, 0.1]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        
        {/* Screen */}
        <mesh position={[0, 0.5, 0.06]} castShadow>
          <boxGeometry args={[2.8, 1.6, 0.01]} />
          <meshStandardMaterial 
            color="#0e1538" 
            emissive="#304675"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Monitor Stand */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.2, 0.5, 0.2]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>
      
      {/* Keyboard */}
      <mesh ref={keyboardRef} position={[0, -0.2, 0.8]} castShadow>
        <boxGeometry args={[2, 0.1, 0.6]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* CPU Tower */}
      <group ref={cpuGroupRef} position={[-1.8, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 1.5, 1.6]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        
        {/* Power button */}
        <mesh position={[0.41, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 12]} />
          <meshStandardMaterial 
            color="#3f51b5"
            emissive="#3f51b5"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
      
      {/* AI chip representation */}
      <mesh position={[1.5, 0.1, 0.8]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <boxGeometry args={[0.5, 0.05, 0.5]} />
        <meshStandardMaterial 
          color="#915eff"
          metalness={0.8}
          roughness={0.2}
          emissive="#915eff"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Code hologram effect */}
      <points position={[0, 0.8, 0.5]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={new Float32Array(300).map(() => Math.random() * 2 - 1)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#00ffff"
          sizeAttenuation
          transparent
          opacity={0.5}
        />
      </points>
    </group>
  );
};

const Computers = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Responsive behavior
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    window.addEventListener("scroll", handleScroll);

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
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ComputerModel isMobile={isMobile} scrollY={scrollY} />
      </Suspense>

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <spotLight
        position={[-5, 5, -5]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />

      <Preload all />
    </Canvas>
  );
};

export default Computers;
