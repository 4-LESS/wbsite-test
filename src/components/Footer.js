// src/components/Footer.js

// Componente de pie de página (Footer) que muestra información de derechos de autor.
// Utiliza react-bootstrap para la estructura de contenedor.

import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#2954a3", // Color de fondo del footer
        color: "white", // Color de texto
        textAlign: "center", // Centrado del texto
        padding: "1rem 0", // Espaciado interno en la parte superior e inferior
        marginTop: "auto", // Permite que el footer se posicione al final de la página
      }}
    >
      <Container>
        <p>
          {/* Muestra el año actual y los derechos de autor */}
          &copy; {new Date().getFullYear()} FarmAhorro. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
