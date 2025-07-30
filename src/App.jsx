import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [img, setImg] = useState(null);
  const [assets, setAssets] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const statusPollRef = useRef(null);

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

  // Enhanced: On mount, check if a generation is already running
  useEffect(() => {
    fetchAssets();
    checkGenerationStatusOnMount();
    // Cleanup polling on unmount
    return () => {
      if (statusPollRef.current) clearInterval(statusPollRef.current);
    };
    // eslint-disable-next-line
  }, []);

  const checkGenerationStatusOnMount = async () => {
    try {
      const res = await fetch('/api/text2img/status');
      const data = await res.json();
      if (data.status === "running") {
        setGenerating(true);
        setProgress(data.progress || 0);
        setImg(null);
        setError('');
        pollStatus();
      } else if (data.status === "done" && data.output) {
        setGenerating(false);
        setProgress(100);
        setImg(`/api/models/${data.output}`);
      } else if (data.status === "error") {
        setGenerating(false);
        setProgress(100);
        setError(data.error || "Unknown error");
      } else {
        setGenerating(false);
        setProgress(0);
      }
    } catch (err) {
      // If backend is down, don't block the UI
      setGenerating(false);
      setProgress(0);
    }
  };

  // Poll generation status
  const pollStatus = () => {
    if (statusPollRef.current) clearInterval(statusPollRef.current);
    statusPollRef.current = setInterval(async () => {
      try {
        const res = await fetch('/api/text2img/status');
        const data = await res.json();
        setProgress(data.progress || 0);
        if (data.status === "done" && data.output) {
          setImg(`/api/models/${data.output}`);
          setGenerating(false);
          setProgress(100);
          fetchAssets();
          clearInterval(statusPollRef.current);
        } else if (data.status === "error") {
          setError(data.error || "Unknown error");
          setGenerating(false);
          clearInterval(statusPollRef.current);
        }
      } catch (err) {
        setError("Network error");
        setGenerating(false);
        clearInterval(statusPollRef.current);
      }
    }, 700);
  };

  const generate = async () => {
    setError('');
    setProgress(0);
    setImg(null);
    setGenerating(true);
    try {
      const res = await fetch(`/api/text2img`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Server error');
        setGenerating(false);
        return;
      }
      pollStatus();
    } catch (err) {
      setError("Network error");
      setGenerating(false);
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
          disabled={generating}
        />
        <button onClick={generate} disabled={generating || !prompt.trim()}>
          {generating ? 'Generating...' : 'Generate'}
        </button>
      </div>
      {generating && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
          <span>{progress}%</span>
        </div>
      )}
      {error && (
        <div className="error">{error}</div>
      )}
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