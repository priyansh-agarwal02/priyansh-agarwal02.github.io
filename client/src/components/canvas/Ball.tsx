import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

const Ball = (props) => {
  const { icon, position, activeColor } = props;
  const meshRef = useRef();
  
  // Make the ball spin
  useFrame((state) => {
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh ref={meshRef} position={position || [0, 0, 0]} castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={activeColor || "#915eff"}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {icon && (
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={1}
            map={icon}
            flatShading
          />
        )}
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon, position, activeColor }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} />
        <Ball icon={icon} position={position} activeColor={activeColor} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
