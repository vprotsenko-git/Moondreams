import { useState } from 'react'
import API from '../api'

export default function Upscale() {
  const [image, setImage] = useState('')
  const [out, setOut] = useState(null)

  const gen = async () => {
    const { data } = await API.post('/upscale', { image })
    setOut(`${API.defaults.baseURL}/models/${data.output}`)
  }

  return (
    <div className="page">
      <h1>Upscale</h1>
      <input
        type="text"
        value={image}
        onChange={e => setImage(e.target.value)}
        placeholder="image-filename.png"
      />
      <button onClick={gen}>Upscale</button>
      {out && <img src={out} alt="upscaled" className="result-img" />}
    </div>
  )
}