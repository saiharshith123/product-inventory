// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

export default function ProtectedRoute({ children, roles }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await api.get("/auth/me"); // user details
        const user = res.data.user;

        // If roles are specified (e.g., admin only)
        if (roles && !roles.includes(user.role)) {
          setAllowed(false);
        } else {
          setAllowed(true);
        }
      } catch (err) {
        setAllowed(false);
      }
      setLoading(false);
    }
    checkAuth();
  }, []);

  if (loading) return <p>Checking authentication...</p>;

  return allowed ? children : <Navigate to="/login" replace />;
}
