import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPills, faUserMd, faTruck } from "@fortawesome/free-solid-svg-icons";

function Inicio() {
  return (
    <>
      {/* Sección de Bienvenida y Características */}
      <div className="bg-primary text-white text-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <h1
                className="animate__animated animate__fadeInDown"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Bienvenido a FarmAhorro
              </h1>
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

      <Container className="my-5">
        <Row className="text-center">
          <Col md={4} className="mb-4">
            <FontAwesomeIcon
              icon={faPills}
              size="3x"
              className="mb-3 text-secondary"
            />
            <h3>Variedad</h3>
            <p>Amplia gama de productos farmacéuticos.</p>
          </Col>
          <Col md={4} className="mb-4">
            <FontAwesomeIcon
              icon={faUserMd}
              size="3x"
              className="mb-3 text-secondary"
            />
            <h3>Profesionales</h3>
            <p>Atención personalizada por expertos.</p>
          </Col>
          <Col md={4} className="mb-4">
            <FontAwesomeIcon
              icon={faTruck}
              size="3x"
              className="mb-3 text-secondary"
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
