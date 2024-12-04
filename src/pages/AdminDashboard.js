// src/pages/AdminDashboard.js

import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.scss";
import { Form, Button, Card, Row, Col, Table, Alert } from "react-bootstrap";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("inventory");

  // Estados para anuncios
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncementUrl, setNewAnnouncementUrl] = useState('');
  const [newAnnouncementAlt, setNewAnnouncementAlt] = useState('');
  const [newAnnouncementCaption, setNewAnnouncementCaption] = useState('');

  // Estado para mostrar mensaje de función no implementada
  const [showAnnouncementMessage, setShowAnnouncementMessage] = useState(false);

  // Estados para notificaciones
  const [notifications, setNotifications] = useState([]);
  const [newNotificationMessage, setNewNotificationMessage] = useState('');
  const [newNotificationActive, setNewNotificationActive] = useState(true);

  useEffect(() => {
    const storedAnnouncements = JSON.parse(localStorage.getItem("announcements")) || [];
    setAnnouncements(storedAnnouncements);

    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  }, []);

  // Gestión de anuncios
  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    // Mostrar mensaje de función no implementada
    setShowAnnouncementMessage(true);
    // Limpiar los campos del formulario
    setNewAnnouncementUrl('');
    setNewAnnouncementAlt('');
    setNewAnnouncementCaption('');
  };

  const handleDeleteAnnouncement = (index) => {
    const updatedAnnouncements = announcements.filter((_, i) => i !== index);
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem("announcements", JSON.stringify(updatedAnnouncements));
  };

  // Gestión de notificaciones
  const handleAddNotification = (e) => {
    e.preventDefault();
    const newNotification = {
      message: newNotificationMessage,
      active: newNotificationActive,
    };
    const updatedNotifications = [...notifications, newNotification];
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    setNewNotificationMessage('');
    setNewNotificationActive(true);
  };

  const handleDeleteNotification = (index) => {
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const toggleNotificationActive = (index) => {
    const updatedNotifications = notifications.map((n, i) =>
      i === index ? { ...n, active: !n.active } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

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
            {/* Sección de Anuncios */}
            <div className="dashboard-section">
              <h3>Gestionar Anuncios</h3>
              {/* Mostrar mensaje si la función no está implementada */}
              {showAnnouncementMessage && (
                <Alert variant="info" onClose={() => setShowAnnouncementMessage(false)} dismissible>
                  ¡Ups! El programador aún no ha implementado esta función.
                </Alert>
              )}
              <Form className="announcement-form" onSubmit={handleAddAnnouncement}>
                <Form.Group controlId="formAnnouncementUrl">
                  <Form.Label>URL de la imagen</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa la URL de la imagen"
                    value={newAnnouncementUrl}
                    onChange={(e) => setNewAnnouncementUrl(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formAnnouncementAlt">
                  <Form.Label>Texto alternativo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa el texto alternativo"
                    value={newAnnouncementAlt}
                    onChange={(e) => setNewAnnouncementAlt(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formAnnouncementCaption">
                  <Form.Label>Caption</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa el caption"
                    value={newAnnouncementCaption}
                    onChange={(e) => setNewAnnouncementCaption(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Agregar Anuncio
                </Button>
              </Form>
              <div className="announcements-list mt-4">
                <Row>
                  {announcements.map((a, index) => (
                    <Col md={4} key={index} className="mb-3">
                      <Card>
                        <Card.Img variant="top" src={a.src} alt={a.alt} />
                        <Card.Body>
                          <Card.Text>{a.caption}</Card.Text>
                          <Button variant="danger" onClick={() => handleDeleteAnnouncement(index)}>
                            Eliminar
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
            {/* Sección de Notificaciones */}
            <div className="dashboard-section mt-5">
              <h3>Gestionar Notificaciones</h3>
              <Form className="notification-form" onSubmit={handleAddNotification}>
                <Form.Group controlId="formNotificationMessage">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa el mensaje"
                    value={newNotificationMessage}
                    onChange={(e) => setNewNotificationMessage(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formNotificationActive">
                  <Form.Check
                    type="checkbox"
                    label="Activa"
                    checked={newNotificationActive}
                    onChange={(e) => setNewNotificationActive(e.target.checked)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Agregar Notificación
                </Button>
              </Form>
              <div className="notifications-list mt-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Mensaje</th>
                      <th>Activa</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.map((n, index) => (
                      <tr key={index}>
                        <td>{n.message}</td>
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={n.active}
                            onChange={() => toggleNotificationActive(index)}
                          />
                        </td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => handleDeleteNotification(index)}>
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
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
          <li className={activeSection === "inventory" ? "active" : ""} onClick={() => setActiveSection("inventory")}>
            Gestión de Inventario
          </li>
          <li className={activeSection === "users" ? "active" : ""} onClick={() => setActiveSection("users")}>
            Gestión de Usuarios
          </li>
          <li className={activeSection === "orders" ? "active" : ""} onClick={() => setActiveSection("orders")}>
            Gestión de Pedidos
          </li>
          <li className={activeSection === "announcements" ? "active" : ""} onClick={() => setActiveSection("announcements")}>
            Anuncios y Notificaciones
          </li>
          <li className={activeSection === "reports" ? "active" : ""} onClick={() => setActiveSection("reports")}>
            Estadísticas y Reportes
          </li>
        </ul>
      </div>
      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
