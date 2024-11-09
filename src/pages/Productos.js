// src/pages/Productos.js
import React, { useState } from "react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { useProductos } from "../hooks/useProductos";
import SearchBar from "../components/SearchBar";
import ProductFilters from "../components/ProductFilters";
import PaginatedProducts from "../components/PaginatedProducts";
import useFilteredProducts from "../hooks/useFilteredProducts";

const Productos = () => {
  const { productos, isLoading, error } = useProductos();
  const {
    filteredProducts,
    searchTerm,
    handleSearchSubmit,
    lineaOptions,
    grupoOptions,
    selectedLinea,
    selectedGrupo,
    handleLineaChange,
    handleGrupoChange,
    resetFilters,
  } = useFilteredProducts(productos);
  
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Buscando productos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4 text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Productos</h1>
      <SearchBar onSearchSubmit={handleSearchSubmit} defaultValue={searchTerm} />
      <ProductFilters
        lineaOptions={lineaOptions}
        grupoOptions={grupoOptions}
        selectedLinea={selectedLinea}
        selectedGrupo={selectedGrupo}
        onLineaChange={handleLineaChange}
        onGrupoChange={handleGrupoChange}
      />
      <div className="d-flex justify-content-end my-3">
        <Button variant="secondary" onClick={resetFilters}>
          Resetear Filtros
        </Button>
      </div>
      <PaginatedProducts
        productos={filteredProducts}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default Productos;


