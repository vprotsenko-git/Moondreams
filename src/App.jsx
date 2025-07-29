import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [view, setView] = useState('generate'); // 'generate' або 'assets'
  const [prompt, setPrompt] = useState('');
  const [img, setImg] = useState(null);
  const [assets, setAssets] = useState([]);
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Функція генерації зображення
  const gen = async () => {
    try {
      const res = await fetch(`${API}/text2img`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (res.ok) {
        setImg(`${API}/models/${data.output}`);
      } else {
        alert(data.error || 'Error');
      }
    } catch (e) {
      console.error(e);
      alert('Network error');
    }
  };

  // Функція отримання списку assets
  useEffect(() => {
    if (view === 'assets') {
      fetch(`${API}/assets`)
        .then(r => r.json())
        .then(setAssets)
        .catch(e => {
          console.error(e);
          setAssets([]);
        });
    }
  }, [view, API]);

  return (
    <div className="app">
      <h1>Moondreams</h1>
      {/* Перемикачі вкладок */}
      <div className="tabs">
        <button
          className={view === 'generate' ? 'active' : ''}
          onClick={() => setView('generate')}
        >
          Generate
        </button>
        <button
          className={view === 'assets' ? 'active' : ''}
          onClick={() => setView('assets')}
        >
          Assets
        </button>
      </div>

      {/* Вміст вкладок */}
      {view === 'generate' ? (
        <div className="ctrl">
          <input
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Enter prompt..."
          />
          <button onClick={gen}>Generate</button>
          {img && <img src={img} className="result" />}
        </div>
      ) : (
        <div className="assets-page">
          {assets.length === 0 ? (
            <p>No assets found.</p>
          ) : (
            <div className="assets-grid">
              {assets.map(f => {
                const url = `${API}/models/${f}`;
                return <img key={f} src={url} alt={f} className="asset-item" />;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}