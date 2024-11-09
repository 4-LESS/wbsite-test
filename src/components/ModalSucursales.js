// src/components/ModalSucursales.js

// Componente de modal que muestra opciones de sucursales y permite redirigir a la página "Sobre Nosotros".
// Utiliza react-bootstrap para el diseño del modal y react-router-dom para la navegación.

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ModalSucursales({ show, onHide }) {
  const navigate = useNavigate();

  // Maneja la redirección a la página "Sobre Nosotros" con el id de la sección especificada
  const handleRedirect = (sectionId) => {
    onHide(); // Cierra el modal antes de redirigir
    navigate('/sobre-nosotros', { state: { sectionId } }); // Navega y envía el estado de la sección
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sucursales</Modal.Title> {/* Título del modal */}
      </Modal.Header>
      <Modal.Body className="text-center">
        {/* Botón para redirigir a la sección "Farmacia 1" en la página "Sobre Nosotros" */}
        <Button
          variant="outline-primary"
          className="mb-3"
          onClick={() => handleRedirect('farmacia1')}
        >
          Farmacia 1
        </Button>
        {/* Botón para redirigir a la sección "Farmacia 2" en la página "Sobre Nosotros" */}
        <Button
          variant="outline-primary"
          className="mb-3"
          onClick={() => handleRedirect('farmacia2')}
        >
          Farmacia 2
        </Button>
      </Modal.Body>
    </Modal>
  );
}

// Validación de tipos de props para asegurar que se pasen correctamente al componente
ModalSucursales.propTypes = {
  show: PropTypes.bool.isRequired, // Indica si el modal debe mostrarse
  onHide: PropTypes.func.isRequired, // Función para cerrar el modal
};

export default ModalSucursales;
