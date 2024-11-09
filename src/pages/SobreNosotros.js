// src/pages/SobreNosotros.js
// Página "Sobre Nosotros" para mostrar información de las sucursales de FarmAhorro.
// Incluye una descripción general y secciones detalladas para las ubicaciones de Farmacia 1 y Farmacia 2.

import React from 'react';
import { Container } from 'react-bootstrap';

function SobreNosotros() {
  return (
    <Container className="my-4">
      {/* Título y descripción general */}
      <h1>Sobre Nosotros</h1>
      <p>Somos una farmacia comprometida con tu bienestar desde 1990.</p>

      {/* Sección de información para Farmacia 1 */}
      <section id="farmacia1" style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Farmacia 1</h2>

        {/* Horarios de atención de Farmacia 1 */}
        <div style={{ marginTop: '1rem' }}>
          <h4>Horarios de atención</h4>
          <ul style={{ listStyleType: 'none', padding: 0, fontSize: '1.1rem' }}>
            <li>Lunes a Viernes: 9:00 AM - 7:00 PM</li>
            <li>Sábado: 10:00 AM - 5:00 PM</li>
            <li>Domingo: Cerrado</li>
          </ul>
        </div>

        {/* Dirección de Farmacia 1 (aún por agregar) */}
        <p style={{ fontSize: '1.1rem', color: 'gray', marginTop: '1rem' }}>Agregar dirección</p>
        
        {/* Línea divisoria */}
        <hr style={{ borderTop: '1px solid #ddd' }} />
      </section>

      {/* Sección de información para Farmacia 2 */}
      <section id="farmacia2" style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Farmacia 2</h2>

        {/* Horarios de atención de Farmacia 2 */}
        <div style={{ marginTop: '1rem' }}>
          <h4>Horarios de atención</h4>
          <ul style={{ listStyleType: 'none', padding: 0, fontSize: '1.1rem' }}>
            <li>Lunes a Viernes: 8:30 AM - 6:30 PM</li>
            <li>Sábado: 9:00 AM - 3:00 PM</li>
            <li>Domingo: Cerrado</li>
          </ul>
        </div>

        {/* Dirección de Farmacia 2 (aún por agregar) */}
        <p style={{ fontSize: '1.1rem', color: 'gray', marginTop: '1rem' }}>Agregar dirección</p>
        
        {/* Línea divisoria */}
        <hr style={{ borderTop: '1px solid #ddd' }} />
      </section>
    </Container>
  );
}

export default SobreNosotros;

