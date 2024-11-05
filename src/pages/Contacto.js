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
        <iframe
          title="mapa"
          src="https://www.google.com/maps/embed?pb=!1m18... (tu enlace de Google Maps)"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </Container>
  );
}

export default Contacto;
