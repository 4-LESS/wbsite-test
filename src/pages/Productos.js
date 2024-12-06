// src/pages/Productos.js

import React, { useState } from "react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { useProductos } from "../hooks/useProductos"; // Hook para cargar productos desde un archivo CSV
import SearchBar from "../components/SearchBar"; // Componente para la barra de búsqueda
import ProductFilters from "../components/ProductFilters"; // Componente para filtros de productos
import PaginatedProducts from "../components/PaginatedProducts"; // Componente para la paginación de productos
import ProductDetails from "../components/ProductDetails"; // Componente para mostrar los detalles de un producto
import useFilteredProducts from "../hooks/useFilteredProducts"; // Hook para aplicar filtros a los productos
import { Routes, Route } from "react-router-dom";

const Productos = () => {
  // Cargar productos y manejar estados de carga y errores
  const { productos, isLoading, error } = useProductos();

  // Aplicar filtros y manejar el estado de los mismos
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
    <Routes>
      {/* Ruta principal para mostrar todos los productos */}
      <Route
        path="/"
        element={
          <Container className="my-4">
            <h1 className="mb-4">Productos</h1>
            <SearchBar onSearch={handleSearchSubmit} defaultValue={searchTerm} />
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
        }
      />
      {/* Ruta para los detalles del producto */}
      <Route path="/producto/:productId" element={<ProductDetails />} />
    </Routes>
  );
};

export default Productos;






