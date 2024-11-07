import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalSucursales({ show, onHide }) {
  const handleRedirect = (sectionId) => {
    onHide(); // Cierra el modal primero
    window.location.assign(`/sobre-nosotros#${sectionId}`); // Cambia la URL a la sección deseada
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sucursales</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Button
          variant="outline-primary"
          className="mb-3"
          onClick={() => handleRedirect('farmacia1')}
        >
          Farmacia 1
        </Button>
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

export default ModalSucursales;
