import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#2954a3",
        color: "white",
        textAlign: "center",
        padding: "1rem 0",
        marginTop: "auto",
      }}
    >
      <Container>
        <p>
          &copy; {new Date().getFullYear()} Farmacia XYZ. Todos los derechos
          reservados.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
