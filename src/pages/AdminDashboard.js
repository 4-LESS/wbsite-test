import React, { useState } from "react";
import "../styles/AdminDashboard.scss"; // Archivo de estilos personalizados

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("inventory");

  const renderContent = () => {
    switch (activeSection) {
      case "inventory":
        return (
          <div className="admin-section">
            <h2>Gestión de Inventario</h2>
            <p>Aquí puedes ver, actualizar y gestionar el inventario.</p>
            <button className="btn-primary">Ver Inventario</button>
            <button className="btn-secondary">Agregar Producto</button>
          </div>
        );
      case "users":
        return (
          <div className="admin-section">
            <h2>Gestión de Usuarios</h2>
            <p>Consulta la lista de usuarios y edita sus roles o estados.</p>
            <button className="btn-primary">Ver Usuarios</button>
            <button className="btn-secondary">Editar Roles</button>
          </div>
        );
      case "orders":
        return (
          <div className="admin-section">
            <h2>Gestión de Pedidos</h2>
            <p>Gestiona los pedidos realizados por los clientes.</p>
            <button className="btn-primary">Ver Pedidos</button>
            <button className="btn-secondary">Actualizar Estado</button>
          </div>
        );
      case "announcements":
        return (
          <div className="admin-section">
            <h2>Anuncios y Notificaciones</h2>
            <p>Publica anuncios y configura notificaciones para los clientes.</p>
            <button className="btn-primary">Publicar Anuncio</button>
            <button className="btn-secondary">Configurar Notificaciones</button>
          </div>
        );
      case "reports":
        return (
          <div className="admin-section">
            <h2>Estadísticas y Reportes</h2>
            <p>Consulta estadísticas de ventas, usuarios y pedidos.</p>
            <button className="btn-primary">Ver Reportes</button>
            <button className="btn-secondary">Descargar Estadísticas</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <ul className="menu">
          <li
            className={activeSection === "inventory" ? "active" : ""}
            onClick={() => setActiveSection("inventory")}
          >
            Gestión de Inventario
          </li>
          <li
            className={activeSection === "users" ? "active" : ""}
            onClick={() => setActiveSection("users")}
          >
            Gestión de Usuarios
          </li>
          <li
            className={activeSection === "orders" ? "active" : ""}
            onClick={() => setActiveSection("orders")}
          >
            Gestión de Pedidos
          </li>
          <li
            className={activeSection === "announcements" ? "active" : ""}
            onClick={() => setActiveSection("announcements")}
          >
            Anuncios y Notificaciones
          </li>
          <li
            className={activeSection === "reports" ? "active" : ""}
            onClick={() => setActiveSection("reports")}
          >
            Estadísticas y Reportes
          </li>
        </ul>
      </div>

      <div className="admin-content">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;