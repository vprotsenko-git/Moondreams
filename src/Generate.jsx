import React, { useState } from 'react';
import './App.css';

export default function Generate() {
  const [prompt, setPrompt] = useState('');
  const [img, setImg] = useState(null);
  const API = ''; // відносний шлях

  const gen = async () => {
    try {
      const res = await fetch(`/text2img`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (res.ok) {
        setImg(`/models/${data.output}`);
      } else {
        alert(data.error || 'Error');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <div className="generate-page">
      <h2>Text → Image</h2>
      <div className="ctrl">
        <input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Enter prompt..."
        />
        <button onClick={gen}>Generate</button>
      </div>
      {img && <img src={img} alt="Generated" className="result" />}
    </div>
  );
}