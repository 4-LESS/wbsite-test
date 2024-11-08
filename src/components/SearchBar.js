import React, { useState, useEffect } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function SearchBar({ onSearch, defaultValue = "" }) {
  const [termino, setTermino] = useState(defaultValue);

  useEffect(() => {
    setTermino(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(termino);
    }, 500); // Retraso de 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [termino, onSearch]);

  const manejarCambio = (e) => {
    setTermino(e.target.value);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    onSearch(termino);
  };

  return (
    <Form className="d-flex my-3" onSubmit={manejarSubmit}>
      <InputGroup className="search-bar">
        <FormControl
          type="search"
          placeholder="Buscar productos..."
          aria-label="Buscar"
          value={termino}
          onChange={manejarCambio}
          className="rounded-pill"
        />
        <InputGroup.Text className="bg-transparent border-0 search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

export default SearchBar;

