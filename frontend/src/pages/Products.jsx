import React, { useEffect, useState } from 'react';
import api from '../api/axios.js';
import ProductForm from '../components/ProductForm';

export default function Products(){
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const res = await api.get('/products?page=1&pageSize=10');
    setProducts(res.data.data || []);
  };
  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <h3>Products</h3>
      <button onClick={()=>setShowForm(true)}>Add Product</button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 10 }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ddd', padding: 8 }}>
            <div style={{ height: 80, background: '#f4f4f4' }} />
            <h4>{p.name}</h4>
            <p>SKU: {p.sku}</p>
            <p>Qty: {p.quantity}</p>
          </div>
        ))}
      </div>

      {showForm && <ProductForm onClose={()=>{ setShowForm(false); load(); }} />}
    </div>
  );
}
