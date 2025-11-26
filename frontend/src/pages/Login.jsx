import React, { useState } from 'react';
import api from '../api/axios.js';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await api.post('/auth/login', { email, password });
      // server sets httpOnly cookie; we can request /api/auth/me if needed
      nav('/dashboard');
    } catch (err) {
      setErr(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} required/>
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        </div>
        <div style={{ marginTop: 10 }}>
          <button type="submit">Login</button>
        </div>
        {err && <div style={{ color: 'red' }}>{err}</div>}
        <div style={{ marginTop: 8 }}>
          Demo creds:
          <ul>
            <li>Admin: admin@inventory.com / admin123</li>
            <li>Manager: manager@inventory.com / manager123</li>
          </ul>
        </div>
      </form>
    </div>
  );
}
