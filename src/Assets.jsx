import React, { useState, useEffect } from 'react';
import './App.css';

export default function Assets() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetch(`/assets`)
      .then(r => r.json())
      .then(setAssets)
      .catch(err => {
        console.error(err);
        setAssets([]);
      });
  }, []);

  return (
    <div className="assets-page">
      <h2>Assets</h2>
      {assets.length === 0 ? (
        <p>No assets found.</p>
      ) : (
        <div className="assets-grid">
          {assets.map(f => (
            <img key={f} src={`/models/${f}`} alt={f} className="asset-item" />
          ))}
        </div>
      )}
    </div>
  );
}