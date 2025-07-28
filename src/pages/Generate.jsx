import React, { useState } from 'react';

export default function Generate() {
  const [step, setStep] = useState('text2img'); // або 'img2video', 'upscale' тощо
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // обираємо URL залежно від кроку
      const urlMap = {
        text2img: 'http://35.208.247.187:5000/text2img',
        img2video: 'http://35.208.247.187:5000/img2video',
        // додавай інші
      };
      const res = await fetch(urlMap[step], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('Помилка генерації: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Генерація {step}</h2>
      <select value={step} onChange={e => setStep(e.target.value)}>
        <option value="text2img">Text → Image</option>
        <option value="img2video">Image → Video</option>
        {/* інші опції */}
      </select>
      <textarea
        placeholder="Введи prompt або параметри"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Генеруємо...' : 'Згенерувати'}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          {step === 'text2img' && <img src={`http://35.208.247.187:5000${result.image_url}`} alt="AI result" />}
          {step === 'img2video' && (
            <video controls>
              <source src={`http://35.208.247.187:5000${result.video_url}`} type="video/mp4" />
            </video>
          )}
          {/* і так далі для інших кроків */}
        </div>
      )}
    </div>
  );
}