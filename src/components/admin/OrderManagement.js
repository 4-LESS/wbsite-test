import React from "react";

// Componente para la gestión de pedidos
const OrderManagement = () => {
  return (
    <div className="admin-section">
      <h2>Gestión de Pedidos</h2>
      <p>Gestiona los pedidos realizados por los clientes.</p>
      <button className="btn-primary">Ver Pedidos</button>
      <button className="btn-secondary">Actualizar Estado</button>
    </div>
  );
};

export default OrderManagement;
