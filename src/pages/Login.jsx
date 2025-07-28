import React, { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://35.208.247.187:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || res.statusText);
      }
      
     // Зберігаємо отриманий токен
     const token = data.access_token;
     localStorage.setItem('moondreams_token', token);
      // в Login.jsx, при успіху
      window.location.href = '/generate';
    } catch (err) {
      console.error(err);
      setMessage('Помилка входу: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Логін</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Логін"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Увійти</button>
      </form>
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
}