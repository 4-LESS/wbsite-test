// src/pages/Productos.js

// Página de productos que permite a los usuarios buscar y filtrar productos.
// Incluye un campo de búsqueda, filtros por línea y grupo, y paginación de productos.

import React, { useState } from "react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { useProductos } from "../hooks/useProductos"; // Hook para cargar productos desde un archivo CSV
import SearchBar from "../components/SearchBar";
import ProductFilters from "../components/ProductFilters";
import PaginatedProducts from "../components/PaginatedProducts";
import useFilteredProducts from "../hooks/useFilteredProducts"; // Hook para aplicar filtros a los productos

const Productos = () => {
  // Cargar productos y manejar estados de carga y errores
  const { productos, isLoading, error } = useProductos();

  // Aplicar filtros y manejar el estado de los mismos
  const {
    filteredProducts,  // Lista de productos filtrados
    searchTerm,        // Término de búsqueda
    handleSearchSubmit, // Función para actualizar el término de búsqueda
    lineaOptions,       // Opciones únicas para el filtro de línea
    grupoOptions,       // Opciones únicas para el filtro de grupo
    selectedLinea,      // Línea seleccionada
    selectedGrupo,      // Grupo seleccionado
    handleLineaChange,  // Función para cambiar la línea seleccionada
    handleGrupoChange,  // Función para cambiar el grupo seleccionado
    resetFilters,       // Función para restablecer los filtros
  } = useFilteredProducts(productos);

  // Estado de la página actual para el componente de paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Muestra un spinner de carga si los productos están cargando
  if (isLoading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Buscando productos...</p>
      </Container>
    );
  }

  // Muestra un mensaje de error si ocurre un problema al cargar los productos
  if (error) {
    return (
      <Container className="my-4 text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Renderiza la página de productos con el buscador, filtros y productos paginados
  return (
    <Container className="my-4">
      <h1 className="mb-4">Productos</h1>
      
      {/* Barra de búsqueda para buscar productos */}
      <SearchBar onSearchSubmit={handleSearchSubmit} defaultValue={searchTerm} />

      {/* Filtros de productos: Línea y Grupo */}
      <ProductFilters
        lineaOptions={lineaOptions}
        grupoOptions={grupoOptions}
        selectedLinea={selectedLinea}
        selectedGrupo={selectedGrupo}
        onLineaChange={handleLineaChange}
        onGrupoChange={handleGrupoChange}
      />

      {/* Botón para resetear los filtros aplicados */}
      <div className="d-flex justify-content-end my-3">
        <Button variant="secondary" onClick={resetFilters}>
          Resetear Filtros
        </Button>
      </div>

      {/* Componente de productos paginados */}
      <PaginatedProducts
        productos={filteredProducts}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default Productos;



