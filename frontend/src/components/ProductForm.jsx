import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function ProductForm({ onClose, initial }) {
  const [name, setName] = useState(initial?.name || '');
  const [sku, setSku] = useState(initial?.sku || '');
  const [price, setPrice] = useState(initial?.price || '');
  const [quantity, setQuantity] = useState(initial?.quantity || 0);
  const [categoryId, setCategoryId] = useState(initial?.category?.id || '');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    api.get('/categories').then(r=>setCategories(r.data.data || []));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', name);
    fd.append('sku', sku);
    fd.append('price', price);
    fd.append('quantity', quantity);
    fd.append('categoryId', categoryId);
    if (image) fd.append('image', image);

    try {
      await api.post('/products', fd);
      onClose();
    } catch (err) {
      alert(err?.response?.data?.message || 'Error');
    }
  };

  return (
    <div style={{ position: 'fixed', left: 0, top:0, right: 0, bottom:0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={submit} style={{ background: '#fff', padding: 20, width: 420 }}>
        <h4>{initial ? 'Edit' : 'Add'} Product</h4>
        <div>
          <label>Name</label><br/>
          <input value={name} onChange={e=>setName(e.target.value)} required/>
        </div>
        <div>
          <label>SKU</label><br/>
          <input value={sku} onChange={e=>setSku(e.target.value)} required/>
        </div>
        <div>
          <label>Price</label><br/>
          <input type="number" value={price} onChange={e=>setPrice(e.target.value)} />
        </div>
        <div>
          <label>Quantity</label><br/>
          <input type="number" value={quantity} onChange={e=>setQuantity(e.target.value)} />
        </div>
        <div>
          <label>Category</label><br/>
          <select value={categoryId} onChange={e=>setCategoryId(e.target.value)}>
            <option value="">--Select--</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label>Image</label><br/>
          <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} />
        </div>
        <div style={{ marginTop: 10 }}>
          <button type="submit">Save</button> <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
