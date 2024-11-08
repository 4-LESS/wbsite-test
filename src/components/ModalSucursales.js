import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ModalSucursales({ show, onHide }) {
  const navigate = useNavigate();

  const handleRedirect = (sectionId) => {
    onHide(); // Cierra el modal primero
    navigate('/sobre-nosotros', { state: { sectionId } }); // Redirige con estado
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

ModalSucursales.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default ModalSucursales;
