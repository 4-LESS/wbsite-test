// src/components/ModalSucursales.js
// Componente de modal para seleccionar sucursales y redirigir a sus páginas específicas.

import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ModalSucursales({ show, onHide }) {
  const navigate = useNavigate();

  // Redirección a las páginas específicas de las sucursales
  const handleRedirect = (path) => {
    onHide(); // Cierra el modal
    navigate(path); // Redirige a la ruta especificada
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sucursales</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {/* Botón para ir a Farmacia 1 */}
        <Button
          variant="outline-primary"
          className="mb-3"
          onClick={() => handleRedirect("/farmacia1")}
        >
          Cancha Rayada
        </Button>
        {/* Botón para ir a Farmacia 2 */}
        <Button
          variant="outline-primary"
          className="mb-3"
          onClick={() => handleRedirect("/farmacia2")}
        >
          Luis Valente Rossi
        </Button>
      </Modal.Body>
    </Modal>
  );
}

// Validación de las props del componente
ModalSucursales.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default ModalSucursales;
