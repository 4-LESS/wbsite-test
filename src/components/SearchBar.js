// src/components/SearchBar.js

// Componente de barra de búsqueda que permite a los usuarios buscar productos.
// Incluye un ícono de búsqueda y envía el término de búsqueda al hacer submit o cambiar el valor.
// Utiliza react-bootstrap para el diseño del campo de búsqueda e ícono.

import React, { useState, useEffect } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function SearchBar({ onSearch, onSearchSubmit, defaultValue = "" }) {
  const [termino, setTermino] = useState(defaultValue); // Estado para el término de búsqueda

  // Actualiza el término de búsqueda cuando el valor predeterminado cambia
  useEffect(() => {
    setTermino(defaultValue);
  }, [defaultValue]);

  // Maneja los cambios en el campo de búsqueda y actualiza el estado
  const manejarCambio = (e) => {
    setTermino(e.target.value);
  };

  // Maneja el submit del formulario y llama a la función de búsqueda proporcionada
  const manejarSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(termino);
  };

  return (
    <Form className="d-flex my-3" onSubmit={manejarSubmit}>
      <InputGroup className="search-bar">
        {/* Campo de entrada de búsqueda */}
        <FormControl
          type="search"
          placeholder="Buscar productos..."
          aria-label="Buscar"
          value={termino} // Valor controlado por el estado
          onChange={manejarCambio} // Llama a manejarCambio en cada cambio de entrada
          className="rounded-pill" // Estilo redondeado
        />
        {/* Ícono de búsqueda dentro del campo */}
        <InputGroup.Text className="bg-transparent border-0 search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}

// Definición de tipos de prop para asegurar el uso correcto del componente
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // Función llamada en cada cambio de búsqueda (si se usa)
  onSearchSubmit: PropTypes.func.isRequired,  // Función llamada al hacer submit
  defaultValue: PropTypes.string, // Valor inicial del término de búsqueda
};

export default SearchBar;
