import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/userStyles.scss"; // Archivo de estilos

const ClientDashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [activeSection, setActiveSection] = useState("personalInfo");

  if (isLoading) {
    return <div className="dashboard-container">Cargando información del usuario...</div>;
  }

  if (!isAuthenticated) {
    return <div className="dashboard-container">No estás autenticado. Por favor, inicia sesión.</div>;
  }

  // Renderizar el contenido dinámico de cada sección
  const renderContent = () => {
    switch (activeSection) {
      case "personalInfo":
        return (
          <div className="dashboard-section">
            <h2>Información Personal</h2>
            <p><strong>Nombre:</strong> {user.name || "No disponible"}</p>
            <p><strong>Email:</strong> {user.email || "No disponible"}</p>
            <p><strong>Teléfono:</strong> +569 123 456 789 (opcional)</p>
            <p><strong>Dirección:</strong> Av. Principal 123, Santiago, Chile</p>
          </div>
        );
      case "purchaseHistory":
        return (
          <div className="dashboard-section">
            <h2>Historial de Compras</h2>
            <ul>
              <li>
                <strong>Pedido #00123:</strong> $45.000 - 20/11/2024
                <br />
                Estado: <span className="status delivered">Entregado</span>
              </li>
              <li>
                <strong>Pedido #00122:</strong> $12.000 - 10/11/2024
                <br />
                Estado: <span className="status pending">En Proceso</span>
              </li>
              <li>
                <strong>Pedido #00121:</strong> $78.000 - 01/11/2024
                <br />
                Estado: <span className="status cancelled">Cancelado</span>
              </li>
            </ul>
          </div>
        );
      case "paymentMethods":
        return (
          <div className="dashboard-section">
            <h2>Métodos de Pago</h2>
            <ul>
              <li>
                <strong>Tarjeta Visa:</strong> **** **** **** 1234
              </li>
              <li>
                <strong>Tarjeta Mastercard:</strong> **** **** **** 5678
              </li>
            </ul>
            <button className="btn-primary">Añadir Método de Pago</button>
          </div>
        );
      case "securitySettings":
        return (
          <div className="dashboard-section">
            <h2>Configuración de Seguridad</h2>
            <button className="btn-secondary">Cambiar Contraseña</button>
            <button className="btn-secondary">Activar Autenticación en Dos Pasos</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Cabecera del Dashboard */}
      <div className="dashboard-header">
        <img
          src={user.picture}
          alt="Foto de perfil"
          className="user-profile-picture"
        />
        <div className="user-info">
          <h1>Hola, {user.name || user.nickname || "Usuario"}</h1>
          <p>{user.email}</p>
        </div>
      </div>

      {/* Contenido del Dashboard */}
      <div className="dashboard-content">
        {/* Barra lateral */}
        <div className="sidebar">
          <ul className="menu">
            <li
              className={activeSection === "personalInfo" ? "active" : ""}
              onClick={() => setActiveSection("personalInfo")}
            >
              Información Personal
            </li>
            <li
              className={activeSection === "purchaseHistory" ? "active" : ""}
              onClick={() => setActiveSection("purchaseHistory")}
            >
              Historial de Compras
            </li>
            <li
              className={activeSection === "paymentMethods" ? "active" : ""}
              onClick={() => setActiveSection("paymentMethods")}
            >
              Métodos de Pago
            </li>
            <li
              className={activeSection === "securitySettings" ? "active" : ""}
              onClick={() => setActiveSection("securitySettings")}
            >
              Configuración de Seguridad
            </li>
          </ul>
        </div>

        {/* Contenido dinámico */}
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ClientDashboard;