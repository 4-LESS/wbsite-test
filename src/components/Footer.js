import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-primary text-white text-center py-3 mt-auto">
      <Container>
        <p>&copy; {new Date().getFullYear()} Farmacia XYZ. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
}

export default Footer;