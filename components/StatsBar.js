export default function StatsBar({ label, value }) {
    return (
        <div style={{ margin: '5px' }}>
            <strong>{label}</strong>: {value}/10
            <div style={{ background: '#ddd', width: '100px', height: '10px' }}>
                <div style={{ width: `${value * 10}px`, height: '10px', background: '#0f0' }}></div>
            </div>
        </div>
    );
}
