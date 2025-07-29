import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [img, setImg] = useState(null);
  const [assets, setAssets] = useState([]);

  const generate = async () => {
    try {
      const res = await fetch(`/api/text2img`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Server error');
      } else {
        setImg(`/api/models/${data.output}`);
      }
    } catch (err) {
      console.error(err);
      alert('Network error — перевір бекенд');
    }
  };

  useEffect(() => {
    fetch(`/api/assets`)
      .then(r => r.json())
      .then(setAssets)
      .catch(err => {
        console.error(err);
        setAssets([]);
      });
  }, []);

  return (
    <div className="app">
      <h1>Moondreams • Text→Image</h1>
      <div className="controls">
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Введи prompt..."
        />
        <button onClick={generate}>Generate</button>
      </div>
      {img && (
        <div className="result">
          <img src={img} alt="Generated" />
        </div>
      )}
      <hr />
      <h2>Assets</h2>
      {assets.length === 0 ? (
        <p>No assets yet.</p>
      ) : (
        <div className="assets-grid">
          {assets.map(f => (
            <img key={f} src={`/api/models/${f}`} alt={f} className="asset-item" />
          ))}
        </div>
      )}
    </div>
  );
}