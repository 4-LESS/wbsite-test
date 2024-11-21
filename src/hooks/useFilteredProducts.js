// src/hooks/useFilteredProducts.js

// Hook personalizado para gestionar y aplicar filtros de productos.
// Actualiza la URL y los estados de los filtros según las selecciones realizadas.

import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useFilteredProducts = (productos) => {
  const navigate = useNavigate(); // Navegación programática para actualizar la URL.
  const location = useLocation(); // Obtiene la ubicación actual (incluye parámetros de búsqueda en la URL).

  // Estados locales para almacenar el término de búsqueda y la categoría seleccionada.
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  /**
   * Inicializa los filtros en base a los parámetros de la URL.
   * Se ejecuta cada vez que cambian los parámetros en la URL.
   */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || ""; // Obtiene el término de búsqueda de la URL.
    const categoria = params.get("categoria") || ""; // Obtiene la categoría de la URL.

    setSearchTerm(search);

    // Si hay una categoría en la URL, la establece como seleccionada.
    if (categoria) {
      setSelectedCategoria({ value: categoria, label: categoria });
    }
  }, [location.search]);

  /**
   * Genera las opciones únicas para el filtro de categoría.
   * Evita duplicados utilizando `Set`.
   */
  const categoriaOptions = useMemo(() => {
    const categorias = productos.map(p => p.categoria); // Extrae las categorías de los productos.
    const uniqueCategorias = Array.from(new Set(categorias)); // Filtra categorías únicas.

    // Mapea las categorías únicas a un formato compatible con el selector.
    return uniqueCategorias.map(categoria => ({
      value: categoria,
      label: categoria,
    }));
  }, [productos]);

  /**
   * Filtra los productos en base al término de búsqueda y la categoría seleccionada.
   */
  const filteredProducts = useMemo(() => {
    return productos.filter(product => {
      const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()); // Coincidencia en búsqueda.
      let matchesCategoria = true;

      // Si hay una categoría seleccionada, verifica si el producto pertenece a ella.
      if (selectedCategoria) {
        const selectedPath = selectedCategoria.value; // Categoría seleccionada.
        const productCategoriaPath = product.categoria; // Categoría del producto.
        matchesCategoria = productCategoriaPath.startsWith(selectedPath);
      }

      return matchesSearch && matchesCategoria; // El producto debe coincidir en búsqueda y categoría.
    });
  }, [productos, searchTerm, selectedCategoria]);

  /**
   * Maneja el envío de la búsqueda.
   * Actualiza el estado y los parámetros de la URL.
   */
  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
    const params = new URLSearchParams(location.search);

    if (term) {
      params.set("search", term); // Establece el término de búsqueda en la URL.
    } else {
      params.delete("search"); // Elimina el término de búsqueda si está vacío.
    }
    navigate(`/productos?${params.toString()}`); // Actualiza la URL.
  };

  /**
   * Maneja los cambios en la categoría seleccionada.
   * Actualiza el estado y los parámetros de la URL.
   */
  const handleCategoriaChange = (selected) => {
    setSelectedCategoria(selected);
    const params = new URLSearchParams(location.search);

    if (selected) {
      params.set("categoria", selected.value); // Establece la categoría seleccionada en la URL.
    } else {
      params.delete("categoria"); // Elimina la categoría si no hay selección.
    }
    navigate(`/productos?${params.toString()}`); // Actualiza la URL.
  };

  /**
   * Restablece todos los filtros y actualiza la URL.
   */
  const resetFilters = () => {
    setSearchTerm(""); // Resetea el término de búsqueda.
    setSelectedCategoria(null); // Resetea la categoría seleccionada.
    navigate(`/productos`); // Navega a la URL base sin parámetros.
  };

  // Retorna los productos filtrados, las opciones de categoría y los handlers para interactuar con los filtros.
  return {
    filteredProducts,
    searchTerm,
    handleSearchSubmit,
    categoriaOptions,
    selectedCategoria,
    handleCategoriaChange,
    resetFilters,
  };
};

export default useFilteredProducts;


