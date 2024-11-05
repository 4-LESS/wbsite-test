import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import 'animate.css';

function Inicio() {
  return (
    <>
      {/* Sección de Bienvenida */}
      <div className="bg-primary text-white text-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <h1
                className="animate__animated animate__fadeInDown"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Bienvenido a Farmacia XYZ
              </h1>
              <p
                className="lead animate__animated animate__fadeInUp"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Tu salud es nuestra prioridad.
              </p>
              <Button
                variant="light"
                className="mt-3 animate__animated animate__zoomIn"
                as={Link}
                to="/productos"
              >
                Ver Productos
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Sección de Características */}
      <Container className="my-5">
        <Row className="text-center">
          <Col md={4} className="mb-4">
            <div className="animate__animated animate__fadeInLeft">
              <FontAwesomeIcon icon="pills" size="3x" className="mb-3 text-primary" />
              <h3>Variedad</h3>
              <p>Amplia gama de productos farmacéuticos.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="animate__animated animate__fadeInUp">
              <FontAwesomeIcon icon="user-md" size="3x" className="mb-3 text-primary" />
              <h3>Profesionales</h3>
              <p>Atención personalizada por expertos.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="animate__animated animate__fadeInRight">
              <FontAwesomeIcon icon="truck" size="3x" className="mb-3 text-primary" />
              <h3>Envíos</h3>
              <p>Servicio de entrega a domicilio rápido y seguro.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Inicio;

