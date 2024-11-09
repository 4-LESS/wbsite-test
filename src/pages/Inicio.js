// src/pages/Inicio.js

// Página de inicio para el sitio web de FarmAhorro, que muestra un carrusel de anuncios, un mensaje de bienvenida
// y una sección de características de los servicios ofrecidos (Variedad, Profesionales y Envíos).

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPills, faUserMd, faTruck } from "@fortawesome/free-solid-svg-icons";
import Anuncios from "../components/Anuncios"; // Componente de carrusel de anuncios para promociones o novedades

function Inicio() {
  return (
    <>
      {/* Contenedor para el carrusel de anuncios */}
      <Container className="my-5">
        <Anuncios /> {/* Componente de carrusel para mostrar anuncios promocionales */}
      </Container>

      {/* Sección de bienvenida con fondo primario y texto blanco */}
      <div className="bg-primary text-white text-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              {/* Título de bienvenida con animación de entrada */}
              <h1
                className="animate__animated animate__fadeInDown"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Bienvenido a FarmAhorro
              </h1>
              {/* Subtítulo que enfatiza el enfoque en la salud del cliente */}
              <p
                className="lead animate__animated animate__fadeInUp"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Tu salud es nuestra prioridad
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Sección de características de los servicios de la farmacia */}
      <Container className="my-5">
        <Row className="text-center">
          {/* Característica: Variedad de productos */}
          <Col md={4} className="mb-4">
            <FontAwesomeIcon
              icon={faPills}
              size="3x"
              className="mb-3 text-secondary" // Ícono con estilo de color secundario
            />
            <h3>Variedad</h3>
            <p>Amplia gama de productos farmacéuticos.</p>
          </Col>

          {/* Característica: Profesionales capacitados */}
          <Col md={4} className="mb-4">
            <FontAwesomeIcon
              icon={faUserMd}
              size="3x"
              className="mb-3 text-secondary" // Ícono que representa atención por profesionales de la salud
            />
            <h3>Profesionales</h3>
            <p>Atención personalizada por expertos.</p>
          </Col>

          {/* Característica: Envío a domicilio */}
          <Col md={4} className="mb-4">
            <FontAwesomeIcon
              icon={faTruck}
              size="3x"
              className="mb-3 text-secondary" // Ícono que representa el servicio de envíos
            />
            <h3>Envíos</h3>
            <p>Servicio de entrega a domicilio rápido y seguro.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Inicio;
