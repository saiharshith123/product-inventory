// src/components/ProductList.jsx
import React from "react";

export default function ProductList({ products = [], onEdit, onDelete }) {
  if (!products.length) {
    return <p>No products found.</p>;
  }

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr style={{ background: "#f0f0f0" }}>
          <th style={th}>Image</th>
          <th style={th}>Name</th>
          <th style={th}>SKU</th>
          <th style={th}>Price</th>
          <th style={th}>Qty</th>
          <th style={th}>Category</th>
          <th style={th}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
            <td style={td}>
              <img
                src={p.imagePath}
                alt={p.name}
                width="60"
                height="60"
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
            </td>

            <td style={td}>{p.name}</td>
            <td style={td}>{p.sku}</td>
            <td style={td}>₹{p.price}</td>
            <td style={td}>{p.quantity}</td>
            <td style={td}>{p.category?.name ?? "—"}</td>

            <td style={td}>
              <button onClick={() => onEdit(p)} style={btnEdit}>
                Edit
              </button>{" "}
              <button onClick={() => onDelete(p.id)} style={btnDelete}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Inline styling
const th = {
  padding: "10px",
  textAlign: "left",
  fontWeight: "bold",
  borderBottom: "2px solid #ddd",
};

const td = {
  padding: "10px",
  verticalAlign: "middle",
};

const btnEdit = {
  padding: "5px 10px",
  background: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const btnDelete = {
  padding: "5px 10px",
  background: "#e53935",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
