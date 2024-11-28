// src/pages/SobreNosotros.js
// Página "Sobre Nosotros" para mostrar información de las sucursales de FarmAhorro.
// Incluye una descripción general y secciones detalladas para las ubicaciones de Farmacia 1 y Farmacia 2.

// src/pages/SobreNosotros.js

import React from "react";
import { Container } from "react-bootstrap";

function SobreNosotros() {
  return (
    <Container className="my-4">
      <h1>Sobre Nosotros</h1>
      <p>
        Somos una farmacia comprometida con tu bienestar desde 1990. Nos
        esforzamos por brindar productos y servicios de alta calidad a nuestros
        clientes.
      </p>
      <h2>Misión</h2>
      <p>
        Proveer medicamentos y productos de salud confiables con un enfoque en
        el bienestar de nuestros clientes.
      </p>
      <h2>Visión</h2>
      <p>
        Ser reconocidos como la farmacia más confiable y accesible de la
        comunidad.
      </p>
    </Container>
  );
}

export default SobreNosotros;

