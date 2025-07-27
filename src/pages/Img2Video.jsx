import { useState } from 'react'
import API from '../api'

export default function Img2Video() {
  const [frames, setFrames] = useState('')
  const [out, setOut] = useState(null)

  const gen = async () => {
    const framesArr = frames.split(',').map(f => f.trim())
    const { data } = await API.post('/img2video', { frames: framesArr })
    setOut(`${API.defaults.baseURL}/models/${data.output}`)
  }

  return (
    <div className="page">
      <h1>Image → Video</h1>
      <input
        type="text"
        value={frames}
        onChange={e => setFrames(e.target.value)}
        placeholder="frame1.png,frame2.png,..."
      />
      <button onClick={gen}>Generate</button>
      {out && (
        <video controls className="result-video">
          <source src={out} type="video/mp4" />
        </video>
      )}
    </div>
  )
}