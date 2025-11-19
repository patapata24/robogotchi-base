// components/Collectible.js
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Collectible({ position, type, onCollect }) {
  const ref = useRef();
  const color = type === 'iron' ? '#888' : type === 'crystal' ? '#0ff' : '#f0f';

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.02;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  const handleClick = () => {
    onCollect(type);
    ref.current.visible = false;
  };

  return (
    <mesh ref={ref} position={position} onClick={handleClick}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}