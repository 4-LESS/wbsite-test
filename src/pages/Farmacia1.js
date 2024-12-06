// src/pages/Farmacia1.js

import React from "react";
import { Container } from "react-bootstrap";

function Farmacia1() {
  return (
    <Container className="my-4">
      <h1>Cancha Rayada</h1>
      <p>
        Bienvenido a la sucursal Cancha Rayada Estamos comprometidos con ofrecerte
        los mejores productos y servicios.
      </p>
      <h4>Horarios de atención</h4>
      <ul>
        <li>Lunes a Viernes: 9:00 AM - 7:00 PM</li>
        <li>Sábado: 10:00 AM - 5:00 PM</li>
        <li>Domingo: Cerrado</li>
      </ul>

      <h4>Nuestra Ubicación</h4>
      <iframe
        title="mapa"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15139.062095199743!2d-70.31022011284178!3d-18.448952299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915aa902546dba17%3A0xf9869fb3c39f89a5!2sFarmacia%20FarmAhorro!5e0!3m2!1ses!2scl!4v1731183974290!5m2!1ses!2scl"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </Container>
  );
}

export default Farmacia1;