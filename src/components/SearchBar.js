import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  const [termino, setTermino] = useState('');

  const manejarCambio = (e) => {
    setTermino(e.target.value);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    onSearch(termino);
  };

  return (
    <Form className="d-flex my-3" onSubmit={manejarSubmit}>
      <FormControl
        type="search"
        placeholder="Buscar productos..."
        className="me-2"
        aria-label="Search"
        value={termino}
        onChange={manejarCambio}
      />
      <Button variant="outline-light" type="submit">Buscar</Button>
    </Form>
  );
}

export default SearchBar;