import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function SobreNosotros() {
  const location = useLocation();

  useEffect(() => {
    // Detecta el hash en la URL y desplaza la vista a esa sección
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <Container className="my-4">
      <h1>Sobre Nosotros</h1>
      <p>Somos una farmacia comprometida con tu bienestar desde 1990.</p>

      {/* Sección de Farmacia 1 */}
      <section id="farmacia1" style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Farmacia 1</h2>
        <div style={{ marginTop: '1rem' }}>
          <h4>Horarios de atención</h4>
          <ul style={{ listStyleType: 'none', padding: 0, fontSize: '1.1rem' }}>
            <li>Lunes a Viernes: 9:00 AM - 7:00 PM</li>
            <li>Sábado: 10:00 AM - 5:00 PM</li>
            <li>Domingo: Cerrado</li>
          </ul>
        </div>
        <p style={{ fontSize: '1.1rem', color: 'gray', marginTop: '1rem' }}>Agregar dirección</p>
        <hr style={{ borderTop: '1px solid #ddd' }} />
      </section>

      {/* Sección de Farmacia 2 */}
      <section id="farmacia2" style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Farmacia 2</h2>
        <div style={{ marginTop: '1rem' }}>
          <h4>Horarios de atención</h4>
          <ul style={{ listStyleType: 'none', padding: 0, fontSize: '1.1rem' }}>
            <li>Lunes a Viernes: 8:30 AM - 6:30 PM</li>
            <li>Sábado: 9:00 AM - 3:00 PM</li>
            <li>Domingo: Cerrado</li>
          </ul>
        </div>
        <p style={{ fontSize: '1.1rem', color: 'gray', marginTop: '1rem' }}>Agregar dirección</p>
        <hr style={{ borderTop: '1px solid #ddd' }} />
      </section>
    </Container>
  );
}

export default SobreNosotros;
