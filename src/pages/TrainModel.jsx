import { useState } from 'react'
import API from '../api'

export default function TrainModel() {
  const [status, setStatus] = useState(null)

  const start = async () => {
    const { data } = await API.post('/train-model')
    setStatus(data.status)
  }

  return (
    <div className="page">
      <h1>Train Model</h1>
      <button onClick={start}>Start Training</button>
      {status && <p>{status}</p>}
    </div>
  )
}