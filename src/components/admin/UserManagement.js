import React from "react";

// Componente para la gestión de usuarios
const UserManagement = () => {
  return (
    <div className="admin-section">
      <h2>Gestión de Usuarios</h2>
      <p>Consulta la lista de usuarios y edita sus roles o estados.</p>
      <button className="btn-primary">Ver Usuarios</button>
      <button className="btn-secondary">Editar Roles</button>
    </div>
  );
};

export default UserManagement;
