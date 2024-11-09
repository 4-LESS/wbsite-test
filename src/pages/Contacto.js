// src/pages/Contacto.js

// Componente de formulario de contacto que permite a los usuarios enviar su nombre, correo electrónico y un mensaje.
// Incluye validación de formulario y un iframe para mostrar la ubicación en Google Maps.

import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function Contacto() {
  const [validated, setValidated] = useState(false);

  const manejarSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Container className="my-4">
      <h1>Contacto</h1>
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

        <Button variant="primary" type="submit" className="mt-3">
          Enviar
        </Button>
      </Form>

      <div className="mt-5">
        <h2>Nuestra Ubicación</h2>
        {/* Iframe de Google Maps para mostrar la ubicación */}
        <iframe
          title="mapa"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15139.062095199743!2d-70.31022011284178!3d-18.448952299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915aa902546dba17%3A0xf9869fb3c39f89a5!2sFarmacia%20FarmAhorro!5e0!3m2!1ses!2scl!4v1731183974290!5m2!1ses!2scl"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </Container>
  );
}

export default Contacto;
