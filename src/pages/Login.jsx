import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const nav = useNavigate()

  const submit = async e => {
    e.preventDefault()
    const { data } = await API.post('/login', { email, password: pwd })
    localStorage.setItem('moondreams_token', data.access_token)
    nav('/text2img')
  }

  return (
    <form onSubmit={submit} className="form">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={pwd}
        onChange={e => setPwd(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  )
}