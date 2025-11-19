import { useState, useEffect } from 'react';
import { WagmiProvider, useAccount } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OnchainKitProvider, Mint } from '@coinbase/onchainkit/mint';
import { wagmiConfig, chain } from '../lib/baseConfig';
import RobotSVG from '../components/RobotSVG';
import StatsBar from '../components/StatsBar';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const queryClient = new QueryClient();

// DEINE ECHTE BASE NFT ADRESSE AUS REMIX
const MY_NFT_CONTRACT = "0xf24333da010aa47cfcd15bdfefb4345c6da12a3b";

export default function Home() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider chain={chain}>
          <RoboGotchiApp />
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function RoboGotchiApp() {
  const [user, setUser] = useState(null);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', 'demo')
        .single();
      setUser(
        data || {
          energy: 80,
          temp: 30,
          friendliness: 70,
          state: 'normal',
        }
      );
    }
    load();
  }, []);

  if (!user)
    return (
      <div style={{ color: 'white', textAlign: 'center', paddingTop: '200px', fontSize: '28px' }}>
        Lade deinen RoboGotchi…
      </div>
    );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>RoboGotchi on Base</h1>
        <RobotSVG state={user.state || 'normal'} height="280px" />

        <div style={styles.stats}>
          <StatsBar label="Energy" value={Math.round(user.energy || 80)} />
          <StatsBar label="Temp" value={Math.round(user.temp || 30)} />
          <StatsBar label="Happiness" value={Math.round(user.friendliness || 70)} />
        </div>

        <div style={styles.buttons}>
          <button style={btn}>Laden</button>
          <button style={btn}>Kühlen</button>
          <button style={btn}>Update</button>
        </div>

        {/* ECHTER MINT BUTTON MIT DEINER REMIX ADRESSE */}
        {isConnected ? (
          <Mint
            contractAddress={MY_NFT_CONTRACT}
            tokenId={1}
            style={{
              margin: '30px auto',
              padding: '18px 40px',
              fontSize: '20px',
              background: '#0052FF',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Mint Upgrade NFT (Base)
          </Mint>
        ) : (
          <w3m-connect-button />
        )}

        <p style={{ marginTop: '25px', color: '#00ffcc', fontSize: '15px' }}>
          {isConnected
            ? `Verbunden: ${address.slice(0, 8)}...${address.slice(-6)}`
            : 'Wallet verbinden für echtes NFT'}
        </p>
      </div>
    </div>
  );
}

// Styling
const styles = {
  container: { background: 'linear-gradient(135deg,#0a0a1f,#1a1a2e)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  card: { background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', borderRadius: '24px', padding: '35px', maxWidth: '440px', width: '100%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' },
  title: { color: '#00ffcc', fontSize: '38px', margin: '0 0 30px', textShadow: '0 0 20px rgba(0,255,204,0.5)' },
  stats: { margin: '40px 0' },
  buttons: { display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', marginBottom: '30px' },
};

const btn = {
  background: 'linear-gradient(45deg,#00ffcc,#0066ff)',
  border: 'none',
  padding: '14px 28px',
  borderRadius: '14px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '17px',
  cursor: 'pointer',
};
