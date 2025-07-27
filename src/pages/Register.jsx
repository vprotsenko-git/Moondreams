import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

export default function Register() {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const nav = useNavigate()

  const submit = async e => {
    e.preventDefault()
    await API.post('/register', { email, password: pwd })
    nav('/login')
  }

  return (
    <form onSubmit={submit} className="form">
      <h1>Register</h1>
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
      <button type="submit">Create Account</button>
    </form>
  )
}