import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [img, setImg] = useState(null);

  const generate = async () => {
    try {
      const res = await fetch(`/text2img`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Server error');
      } else {
        setImg(`/models/${data.output}`);
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
    </div>
  );
}