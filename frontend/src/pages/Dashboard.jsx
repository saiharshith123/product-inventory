import React, { useEffect, useState } from 'react';
import api from '../api/axios.js';

export default function Dashboard(){
  const [user, setUser] = useState(null);
  useEffect(()=>{
    api.get('/auth/me').then(r=>setUser(r.data.user)).catch(()=>setUser(null));
  }, []);
  return (
    <div>
      <h3>Dashboard</h3>
      {user ? <p>Welcome, {user.name} ({user.role})</p> : <p>Loading user...</p>}
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ padding: 10, border: '1px solid #ddd' }}>Total Products: —</div>
        <div style={{ padding: 10, border: '1px solid #ddd' }}>Low Stock: —</div>
        <div style={{ padding: 10, border: '1px solid #ddd' }}>Categories: —</div>
      </div>
    </div>
  );
}
