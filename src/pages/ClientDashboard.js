import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function ClientDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Cargando información del usuario...</div>;
  }

  if (!isAuthenticated) {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>;
  }

  return (
    <div className="container py-4 text-center">
      <h1>Mi Cuenta</h1>
      <img
        src={user.picture}
        alt="Foto de perfil"
        style={{ borderRadius: "50%", width: "100px", height: "100px", objectFit: "cover" }}
      />
      <p>Bienvenido, {user.name || user.nickname}</p>
      <div>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}

export default ClientDashboard;