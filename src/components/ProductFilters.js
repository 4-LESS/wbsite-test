// src/components/ProductFilters.js
import React from "react";
import Select from "react-select";
import { Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const ProductFilters = ({
  lineaOptions,
  grupoOptions,
  selectedLinea,
  selectedGrupo,
  onLineaChange,
  onGrupoChange,
}) => {
  return (
    <Row className="mb-4">
      <Col md={6} className="mb-2">
        <Form.Label><strong>Filtrar por Línea</strong></Form.Label>
        <Select
          options={lineaOptions}
          value={selectedLinea}
          onChange={onLineaChange}
          isClearable
          placeholder="Selecciona una Línea..."
          className="basic-select"
        />
      </Col>
      <Col md={6} className="mb-2">
        <Form.Label><strong>Filtrar por Grupo</strong></Form.Label>
        <Select
          options={grupoOptions}
          value={selectedGrupo}
          onChange={onGrupoChange}
          isClearable
          isDisabled={!selectedLinea}
          placeholder={selectedLinea ? "Selecciona un Grupo..." : "Selecciona una Línea primero"}
          className="basic-select"
        />
      </Col>
    </Row>
  );
};

ProductFilters.propTypes = {
  lineaOptions: PropTypes.array.isRequired,
  grupoOptions: PropTypes.array.isRequired,
  selectedLinea: PropTypes.object,
  selectedGrupo: PropTypes.object,
  onLineaChange: PropTypes.func.isRequired,
  onGrupoChange: PropTypes.func.isRequired,
};

export default ProductFilters;

