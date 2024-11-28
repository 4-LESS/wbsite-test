// src/pages/Contacto.js

// Componente de formulario de contacto que permite a los usuarios enviar su nombre, correo electrónico y un mensaje.
// Incluye validación de formulario

import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

function Contacto() {
  const [validated, setValidated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const manejarSubmit = (event) => {
    event.preventDefault(); // Evita que el formulario envíe datos
    event.stopPropagation(); // Detiene cualquier propagación adicional
    setValidated(true);
    setShowMessage(true); // Muestra el mensaje 
  };

  return (
    <Container className="my-4">
      <h1>Contacto</h1>
      {showMessage && (
        <Alert variant="info" onClose={() => setShowMessage(false)} dismissible>
          ¡Ups! El programador aún no ha implementado esta función
        </Alert>
      )}

      <Form noValidate validated={validated} onSubmit={manejarSubmit}>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control required type="text" placeholder="Ingresa tu nombre" />
          <Form.Control.Feedback type="invalid">
            Por favor ingresa tu nombre.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="nombre@ejemplo.com"
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingresa un correo electrónico válido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formMensaje">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control required as="textarea" rows={3} />
          <Form.Control.Feedback type="invalid">
            Por favor ingresa un mensaje.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Botón de enviar */}
        <Button
          variant="primary"
          type="submit"
          className="mt-3"
        >
          Enviar
        </Button>
      </Form>
    </Container>
  );
}

export default Contacto;
