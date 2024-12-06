import React from "react";

// Componente para la gestión de inventario
const Inventario = () => {
  return (
    <div className="admin-section">
      <h2>Gestión de Inventario</h2>
      <p>Aquí puedes ver, actualizar y gestionar el inventario.</p>
      <button className="btn-primary">Ver Inventario</button>
      <button className="btn-secondary">Agregar Producto</button>
    </div>
  );
};

export default Inventario;
