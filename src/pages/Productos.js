// src/pages/Productos.js

// Página para buscar, filtrar y visualizar productos con soporte para paginación.

import React, { useState } from "react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { useProductos } from "../hooks/useProductos";
import SearchBar from "../components/SearchBar";
import ProductFilters from "../components/ProductFilters";
import PaginatedProducts from "../components/PaginatedProducts";
import useFilteredProducts from "../hooks/useFilteredProducts";

const Productos = () => {
  const { productos, isLoading, error } = useProductos(); // Carga inicial de productos desde CSV.

  const {
    filteredProducts,       // Productos filtrados según búsqueda y categoría.
    searchTerm,             // Término de búsqueda actual.
    handleSearchSubmit,     // Función para manejar búsquedas.
    categoriaOptions,       // Opciones disponibles para el filtro de categoría.
    selectedCategoria,      // Categoría seleccionada.
    handleCategoriaChange,  // Función para cambiar la categoría seleccionada.
    resetFilters,           // Función para restablecer los filtros.
  } = useFilteredProducts(productos);

  const [currentPage, setCurrentPage] = useState(1); // Estado para manejar la paginación.

  if (isLoading) {
    // Muestra un spinner mientras los productos están cargando.
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Buscando productos...</p>
      </Container>
    );
  }

  if (error) {
    // Muestra un mensaje de error si la carga falla.
    return (
      <Container className="my-4 text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Productos</h1>
      
      {/* Barra de búsqueda */}
      <SearchBar onSearchSubmit={handleSearchSubmit} defaultValue={searchTerm} />

      {/* Filtro por categoría */}
      <ProductFilters
        categoriaOptions={categoriaOptions}
        selectedCategoria={selectedCategoria}
        onCategoriaChange={handleCategoriaChange}
      />

      {/* Botón para resetear filtros */}
      <div className="d-flex justify-content-end my-3">
        <Button variant="secondary" onClick={resetFilters}>
          Resetear Filtros
        </Button>
      </div>

      {/* Productos con paginación */}
      <PaginatedProducts
        productos={filteredProducts}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default Productos;

