// src/components/ProductFilters.js

// Componente de filtros de productos que permite seleccionar opciones de Línea y Grupo para filtrar los productos mostrados.
// Utiliza react-select para los menús desplegables y react-bootstrap para la disposición del diseño.

import React from "react";
import Select from "react-select";
import { Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const ProductFilters = ({
  lineaOptions, // Opciones disponibles para el filtro de Línea
  grupoOptions, // Opciones disponibles para el filtro de Grupo, depende de la línea seleccionada
  selectedLinea, // Valor seleccionado para Línea
  selectedGrupo, // Valor seleccionado para Grupo
  onLineaChange, // Función para manejar el cambio de selección en Línea
  onGrupoChange, // Función para manejar el cambio de selección en Grupo
}) => {
  return (
    <Row className="mb-4">
      {/* Selector para Línea de productos */}
      <Col md={6} className="mb-2">
        <Form.Label><strong>Filtrar por Línea</strong></Form.Label>
        <Select
          options={lineaOptions} // Lista de opciones para Línea
          value={selectedLinea} // Valor actualmente seleccionado
          onChange={onLineaChange} // Callback para manejar el cambio de selección
          isClearable // Permite limpiar la selección actual
          placeholder="Selecciona una Línea..." // Placeholder mostrado cuando no hay selección
          className="basic-select"
        />
      </Col>
      
      {/* Selector para Grupo de productos, depende de Línea */}
      <Col md={6} className="mb-2">
        <Form.Label><strong>Filtrar por Grupo</strong></Form.Label>
        <Select
          options={grupoOptions} // Lista de opciones para Grupo, filtrada por Línea seleccionada
          value={selectedGrupo} // Valor actualmente seleccionado
          onChange={onGrupoChange} // Callback para manejar el cambio de selección
          isClearable // Permite limpiar la selección actual
          isDisabled={!selectedLinea} // Deshabilita si no se ha seleccionado una Línea
          placeholder={selectedLinea ? "Selecciona un Grupo..." : "Selecciona una Línea primero"} // Placeholder contextual
          className="basic-select"
        />
      </Col>
    </Row>
  );
};

// Validación de tipos de props para asegurar el uso correcto del componente
ProductFilters.propTypes = {
  lineaOptions: PropTypes.array.isRequired, // Array de opciones para Línea
  grupoOptions: PropTypes.array.isRequired, // Array de opciones para Grupo
  selectedLinea: PropTypes.object, // Objeto seleccionado para Línea, puede ser null
  selectedGrupo: PropTypes.object, // Objeto seleccionado para Grupo, puede ser null
  onLineaChange: PropTypes.func.isRequired, // Función para actualizar la selección de Línea
  onGrupoChange: PropTypes.func.isRequired, // Función para actualizar la selección de Grupo
};

export default ProductFilters;
