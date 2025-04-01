import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const count = 2000;
  const radius = 15;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      
      positions[i * 3] = (radius + Math.random() * 2) * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = (radius + Math.random() * 2) * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = (radius + Math.random() * 2) * Math.cos(theta);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.03;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <Points ref={ref}>
      <PointMaterial
        transparent
        vertexColors
        size={0.2}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={positions.length / 3}
          array={Float32Array.from(Array(count).fill(0).flatMap(() => [
            Math.random() * 0.2 + 0.8, // Brighter white
            Math.random() * 0.2, // Dark
            Math.random() * 0.5 + 0.5, // Purple variation
          ]))}
          itemSize={3}
        />
      </bufferGeometry>
    </Points>
  );
}

const ParticleBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[#030014]">
      <Canvas camera={{ position: [0, 0, 25], fov: 75 }}>
        <fog attach="fog" args={['#030014', 15, 30]} />
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#030014] to-[#030014] opacity-80" />
    </div>
  );
};

export default ParticleBackground; 