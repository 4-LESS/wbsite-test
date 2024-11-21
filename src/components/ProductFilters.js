// src/components/ProductFilters.js

// Componente de filtros de productos que permite seleccionar opciones de Categoría para filtrar los productos mostrados.
// Utiliza react-select para los menús desplegables y react-bootstrap para la disposición del diseño.

import React from "react";
import Select from "react-select";
import { Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";

// **ProductFilters**
// Este componente ofrece un filtro para seleccionar una categoría de productos.
const ProductFilters = ({
  categoriaOptions,       // Opciones disponibles para el filtro de Categoría.
  selectedCategoria,      // Valor actualmente seleccionado para Categoría.
  onCategoriaChange,      // Función para manejar cambios en la selección de Categoría.
}) => {
  return (
    <Row className="mb-4">
      {/* Selector para Categoría de productos */}
      <Col md={6} className="mb-2">
        <Form.Label><strong>Filtrar por Categoría</strong></Form.Label>
        <Select
          options={categoriaOptions}          // Lista de opciones para Categoría.
          value={selectedCategoria}           // Valor actualmente seleccionado.
          onChange={onCategoriaChange}        // Callback para manejar cambios en la selección.
          isClearable                         // Permite limpiar la selección actual.
          placeholder="Selecciona una Categoría..." // Placeholder mostrado cuando no hay selección.
          className="basic-select"
        />
      </Col>
    </Row>
  );
};

// Validación de tipos de props para asegurar el uso correcto del componente.
ProductFilters.propTypes = {
  categoriaOptions: PropTypes.array.isRequired, // Array de opciones para Categoría.
  selectedCategoria: PropTypes.object,         // Objeto seleccionado para Categoría, puede ser null.
  onCategoriaChange: PropTypes.func.isRequired, // Función para actualizar la selección de Categoría.
};

// Exportamos el componente para su uso en otras partes de la aplicación.
export default ProductFilters;
