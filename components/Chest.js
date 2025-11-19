// components/Chest.js
import { useRef } from 'react';
import { Box } from '@react-three/drei';

export default function Chest({ position }) {
  const ref = useRef();

  return (
    <group ref={ref} position={position}>
      <Box args={[3, 2, 2]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      <Box args={[3.2, 0.2, 2.2]} position={[0, 2.1, 0]}>
        <meshStandardMaterial color="#654321" />
      </Box>
    </group>
  );
}