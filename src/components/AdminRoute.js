// src/components/AdminRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuth0();

  // Verificar si el usuario es administrador
  const isAdmin = isAuthenticated && user?.email === "admin@example.com";

  return isAdmin ? children : <Navigate to="/" />;
}

export default AdminRoute;