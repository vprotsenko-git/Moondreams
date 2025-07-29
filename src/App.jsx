import { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const generate = async () => {
    try {
      const res = await fetch(`${API_BASE}/text2img`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (res.ok) {
        setImageUrl(`${API_BASE}/models/${data.output}`);
      } else {
        alert(data.error || 'Error generating');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <div className="app">
      <h1>Moondreams • Text → Image</h1>
      <div className="controls">
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
        />
        <button onClick={generate}>Generate</button>
      </div>
      {imageUrl && (
        <div className="result">
          <img src={imageUrl} alt="Generated" />
        </div>
      )}
    </div>
  );
}

export default App;