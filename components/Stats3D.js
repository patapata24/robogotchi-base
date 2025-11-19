// components/Stats3D.js
export default function Stats3D({ stats }) {
  return (
    <group position={[0, -2, 0]}>
      {[
        { value: stats.hunger, color: '#f66', x: -2 },
        { value: stats.happiness, color: '#6f6', x: 0 },
        { value: stats.energy, color: '#66f', x: 2 },
      ].map((bar, i) => (
        <mesh key={i} position={[bar.x, bar.value / 200, 0]}>
          <boxGeometry args={[0.8, bar.value / 100, 0.4]} />
          <meshStandardMaterial color={bar.color} emissive={bar.color} emissiveIntensity={0.7} />
        </mesh>
      ))}
    </group>
  );
}