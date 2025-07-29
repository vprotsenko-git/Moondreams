import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [img, setImg] = useState(null);
  const [assets, setAssets] = useState([]);

  // Фетчим список ассетів
  const fetchAssets = async () => {
    try {
      const res = await fetch(`/api/assets`);
      const list = await res.json();
      setAssets(list);
    } catch (err) {
      console.error(err);
      setAssets([]);
    }
  };

  // робимо це один раз на маунті
  useEffect(() => {
    fetchAssets();
  }, []);

  // Генерація + оновлення
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
        const newImgUrl = `/api/models/${data.output}`;
        setImg(newImgUrl);
        // перезавантажуємо список файлiв (щоби новий теж побачити)
        fetchAssets();
      }
    } catch (err) {
      console.error(err);
      alert('Network error — перевір бекенд');
    }
  };

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
      <h2>Assets ({assets.length})</h2>
      {assets.length === 0 ? (
        <p>No assets yet.</p>
      ) : (
        <div className="assets-grid">
          {assets.map(f => (
            <img
              key={f}
              src={`/api/models/${f}`}
              alt={f}
              className="asset-item"
            />
          ))}
        </div>
      )}
    </div>
  );
}