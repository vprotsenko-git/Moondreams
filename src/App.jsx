import { useState } from 'react';
import './App.css';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [img, setImg] = useState(null);
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const gen = async () => {
    const res = await fetch(`${API}/text2img`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (res.ok) setImg(`${API}/models/${data.output}`);
    else alert(data.error || 'Error');
  };

  return (
    <div className="app">
      <h1>Moondreams</h1>
      <div className="ctrl">
        <input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Enter prompt..."
        />
        <button onClick={gen}>Generate</button>
      </div>
      {img && <img src={img} className="result" />}
    </div>
  );
}