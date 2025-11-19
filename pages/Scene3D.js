// pages/Scene3D.js
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Robot3D from '../components/Robot3D';        // OHNE .js!
import Collectible from '../components/Collectible';  // OHNE .js!
import Chest from '../components/Chest';              // OHNE .js!

export default function Scene3D({ inventory, setInventory, stats, setStats }) {
  const handleCollect = (type) => {
    setInventory(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }));
    setStats(s => ({ ...s, happiness: Math.min(100, s.happiness + 5) }));
  };

  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
      <color attach="background" args={['#000']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#0ff" />
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />

      <Robot3D stats={stats} />
      <Collectible position={[15, 0, -20]} type="iron" onCollect={handleCollect} />
      <Collectible position={[-10, 5, -30]} type="crystal" onCollect={handleCollect} />
      <Collectible position={[30, -3, -40]} type="energy" onCollect={handleCollect} />
      <Chest position={[0, -2, 0]} />
    </Canvas>
  );
}