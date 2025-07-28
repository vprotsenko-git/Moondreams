import React, { useState } from 'react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://35.208.247.187:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || res.statusText);
      }
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
      setMessage('Помилка: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Логін"
               value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Пароль"
               value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Зареєструватись</button>
      </form>
      {message && <p style={{color: 'red'}}>{message}</p>}
    </div>
  );
}