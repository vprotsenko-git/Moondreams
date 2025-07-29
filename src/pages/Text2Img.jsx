import { useState } from 'react'
import API from '../api'

export default function Text2Img() {
  const [prompt, setPrompt] = useState('')
  const [out, setOut] = useState(null)

  const gen = async () => {
    try {
      const { data } = await API.post('/text2img', { prompt });
      setOut(`${API.defaults.baseURL}/models/${data.output}`);
    } catch (err) {
      console.error(err);
      alert('Generation failed.');
    }
  }

  return (
    <div className="page">
      <h1>Text → Image</h1>
      <input
        type="text"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Enter prompt..."
      />
      <button onClick={gen}>Generate</button>
      {out && <img src={out} alt="result" className="result-img" />}
    </div>
  );
}