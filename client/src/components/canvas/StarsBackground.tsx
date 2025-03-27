import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarProps {
  count?: number;
  speed?: number;
}

const StarsBackground = ({ count = 1000, speed = 0.2 }: StarProps) => {
  const group = useRef<THREE.Group>(null);
  
  // Create a pre-computed array of random positions for stars
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const size = Math.random() * 0.05 + 0.01;
      temp.push({ x, y, z, size });
    }
    return temp;
  }, [count]);
  
  // Create geometries and materials once
  const { geometry, material } = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.x;
      positions[i * 3 + 1] = particle.y;
      positions[i * 3 + 2] = particle.z;
      sizes[i] = particle.size;
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
      color: new THREE.Color('#ffffff'),
      transparent: true,
      opacity: 1,
      map: new THREE.TextureLoader().load('/textures/star.png'),
      blending: THREE.AdditiveBlending,
    });
    
    return { geometry, material };
  }, [count, particles]);
  
  // Animation loop
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (group.current) {
      group.current.rotation.x = time * speed * 0.05;
      group.current.rotation.y = time * speed * 0.075;
    }
  });
  
  return (
    <group ref={group}>
      <points geometry={geometry} material={material} />
    </group>
  );
};

export default StarsBackground;