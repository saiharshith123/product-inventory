import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App(){
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2>Product Inventory</h2>
        <nav>
          <Link to="/">Home</Link> |{' '}
          <Link to="/login">Login</Link> |{' '}
          <Link to="/dashboard">Dashboard</Link> |{' '}
          <Link to="/products">Products</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer style={{ marginTop: 40, borderTop: '1px solid #eee', paddingTop: 10 }}>
        Copyright © 2025 Product Inventory System — <Link to="/privacy">Privacy</Link>
      </footer>
    </div>
  );
}
