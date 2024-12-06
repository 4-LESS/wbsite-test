// src/pages/AdminDashboard.js
import React, { useState } from "react";
import SidebarMenu from "../components/admin/SidebarMenu"; // Barra lateral de navegación
import Inventario from "../components/admin/Inventario"; // Gestión de inventario
import UserManagement from "../components/admin/UserManagement"; // Gestión de usuarios
import OrderManagement from "../components/admin/OrderManagement"; // Gestión de pedidos
import AdminAnuncios from "../components/admin/AdminAnuncios"; // Gestión de anuncios
import Reportes from "../components/admin/Reportes"; // Reportes y estadísticas

import "../styles/userStyles.scss"; // Archivo de estilos

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("inventario"); // Estado para la sección activa

  // Renderiza el contenido según la sección seleccionada
  const renderContent = () => {
    switch (activeSection) {
      case "inventario":
        return <Inventario />;
      case "userManagement":
        return <UserManagement />;
      case "orderManagement":
        return <OrderManagement />;
      case "adminanuncios":
        return <AdminAnuncios />;
      case "reportes":
        return <Reportes />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Barra lateral para cambiar de sección */}
      <SidebarMenu activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Contenido principal */}
      <div className="admin-content">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
