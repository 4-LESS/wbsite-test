import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ModalSucursales({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sucursales</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Button
          variant="outline-primary"
          className="mb-3"
          as={Link}
          to="/sucursal1"
        >
          Farmacia 1
        </Button>
        <Button
          variant="outline-primary"
          className="mb-3"
          as={Link}
          to="/sucursal2"
        >
          Farmacia 2
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default ModalSucursales;
