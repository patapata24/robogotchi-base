// pages/index.js
import { useState, useEffect } from 'react';
import Scene3D from './Scene3D';

export default function Home() {
  const [stats, setStats] = useState({ hunger: 50, happiness: 50, items: { iron: 0, crystal: 0, gold: 0 } });
  const [showInventory, setShowInventory] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('robogotchi-stats');
    if (saved) setStats(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('robogotchi-stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'e' || e.key === 'E') {
        setShowInventory(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', background: '#000' }}>
      {/* FULLSCREEN CANVAS */}
      <div style={{ width: '100%', height: '100%' }}>
        <Scene3D stats={stats} setStats={setStats} />
      </div>

      {/* HUD – Links oben */}
      <div style={{ position: 'absolute', top: 20, left: 20, color: '#0ff', fontFamily: 'monospace', fontSize: 18, pointerEvents: 'none' }}>
        <div>ROBOGOTCHI 3D</div>
        <div style={{ marginTop: 10 }}>
          <div>Hunger: {stats.hunger}%</div>
          <div>Happiness: {stats.happiness}%</div>
        </div>
        <button
          onClick={() => setShowInventory(true)}
          style={{
            marginTop: 15,
            padding: '8px 16px',
            background: '#0f0',
            color: '#000',
            border: 'none',
            borderRadius: 8,
            fontWeight: 'bold',
            cursor: 'pointer',
            pointerEvents: 'auto'
          }}
        >
          Truhe öffnen (E)
        </button>
      </div>

      {/* INVENTAR MODAL */}
      {showInventory && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0ff',
          fontFamily: 'monospace',
          fontSize: 24,
          zIndex: 100
        }}>
          <h2 style={{ margin: '0 0 30px 0', color: '#0f0' }}>INVENTAR</h2>
          <div style={{ marginBottom: 20 }}>
            Eisen: {stats.items.iron}
          </div>
          <div style={{ marginBottom: 20 }}>
            Kristall: {stats.items.crystal}
          </div>
          <div style={{ marginBottom: 40 }}>
            Gold: {stats.items.gold}
          </div>
          <button
            onClick={() => setShowInventory(false)}
            style={{
              padding: '12px 24px',
              background: '#f00',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontSize: 18,
              cursor: 'pointer'
            }}
          >
            Schließen (E)
          </button>
        </div>
      )}

      {/* UNTEN – Aktionen */}
      <div style={{
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 20
      }}>
        <button style={btnStyle('#ff4444')}>Füttern</button>
        <button style={btnStyle('#44ff44')}>Spielen</button>
        <button style={btnStyle('#4444ff')}>Schlafen</button>
      </div>
    </div>
  );
}

const btnStyle = (color) => ({
  padding: '12px 24px',
  background: color,
  color: '#fff',
  border: 'none',
  borderRadius: 50,
  fontWeight: 'bold',
  fontSize: 16,
  cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
});