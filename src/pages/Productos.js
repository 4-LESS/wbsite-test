// src/pages/Productos.js
import React, { useState } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { useProductos } from "../hooks/useProductos";
import SearchBar from "../components/SearchBar";
import ProductFilters from "../components/ProductFilters";
import PaginatedProducts from "../components/PaginatedProducts";
import useFilteredProducts from "../hooks/useFilteredProducts";

const Productos = () => {
  const { productos, isLoading, error } = useProductos();
  const { filteredProducts, searchTerm, handleSearchSubmit } = useFilteredProducts(productos);
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
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h1>Productos</h1>
      {/* Agregar onSearchSubmit para evitar el error */}
      <SearchBar onSearchSubmit={handleSearchSubmit} defaultValue={searchTerm} />
      <ProductFilters />
      <Button variant="secondary" onClick={() => handleSearchSubmit("")}>Resetear Filtros</Button>
      <PaginatedProducts productos={filteredProducts} currentPage={currentPage} onPageChange={setCurrentPage} />
    </Container>
  );
};

export default Productos;

