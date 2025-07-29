import React, { useState, useEffect } from 'react';

export default function Assets() {
  const [files, setFiles] = useState([]);
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Передбачається, що бекенд віддає список файлів у /assets
    fetch(`${API}/assets`)
      .then(res => res.json())
      .then(setFiles)
      .catch(console.error);
  }, []);

  return (
    <div className="assets-page">
      <h2>Assets Gallery</h2>
      {files.length === 0 ? (
        <p>No assets found.</p>
      ) : (
        <div className="assets-grid">
          {files.map(f => {
            const url = `${API}/models/${f}`;
            if (/\.(mp4|webm)$/i.test(f)) {
              return (
                <video key={f} controls className="asset-item">
                  <source src={url} type="video/mp4" />
                </video>
              );
            } else {
              return <img key={f} src={url} alt={f} className="asset-item" />;
            }
          })}
        </div>
      )}
    </div>
  );
}