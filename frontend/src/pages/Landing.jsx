import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing(){
  const sampleProducts = [
    { id:1, name:'Wireless Mouse', price:15.99 },
    { id:2, name:'T-shirt', price:9.99 },
    { id:3, name:'Ceramic Mug', price:5.5 }
  ];
  return (
    <div>
      <section style={{ padding: 20, background: '#f8fafc', borderRadius: 8 }}>
        <h1>Manage Your Inventory Like a Pro</h1>
        <p>Simple, Fast &amp; Secure Product Management System</p>
        <div style={{ marginTop: 12 }}>
          <Link to="/login"><button>Login</button></Link>
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Features</h3>
        <ul>
          <li>Real-time stock tracking</li>
          <li>Role-based access control</li>
          <li>Bulk image upload support</li>
          <li>Advanced search &amp; filters</li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Sample Products</h3>
        <div style={{ display: 'flex', gap: 10 }}>
          {sampleProducts.map(p=>(
            <div key={p.id} style={{ border: '1px solid #ddd', padding: 10, borderRadius: 6 }}>
              <div style={{ height: 80, background: '#f0f0f0' }} />
              <h4>{p.name}</h4>
              <p>${p.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Testimonials</h3>
        <blockquote>"Great product!" — Jane, Store Owner</blockquote>
        <blockquote>"Saves us so much time." — Mark, Manager</blockquote>
      </section>
    </div>
  );
}
