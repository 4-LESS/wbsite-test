// src/pages/Farmacia2.js

import React from "react";
import { Container } from "react-bootstrap";

function Farmacia2() {
  return (
    <Container className="my-4">
      <h1>Luis Valente Rossi</h1>
      <p>
        Bienvenido a la sucursal Luis Valente Rossi. Nuestra misión es garantizar tu
        bienestar con productos de calidad.
      </p>
      <h4>Horarios de atención</h4>
      <ul>
        <li>Lunes a Viernes: 8:30 AM - 6:30 PM</li>
        <li>Sábado: 9:00 AM - 3:00 PM</li>
        <li>Domingo: Cerrado</li>
      </ul>

      <h4>Nuestra Ubicación</h4>
      <iframe
        title="mapa"
        src= "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d945.9449176306116!2d-70.29553773039474!3d-18.493636727063315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915aa9d18f136255%3A0xbcfaedf7e2cfd0f4!2sAv.%20Senador%20Luis%20Valente%20Rossi%202332%2C%20Arica%2C%20Arica%20y%20Parinacota!5e0!3m2!1ses!2scl!4v1732766196026!5m2!1ses!2scl"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </Container>
  );
}

export default Farmacia2;
