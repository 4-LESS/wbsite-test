// src/hooks/useProductos.js

// Hook para cargar productos desde un archivo CSV y asignar categorías dinámicamente.

import { useState, useEffect, useCallback } from "react";
import Papa from "papaparse";
import { getPlaceholderImage } from "../utils/helpers";
import { categoryMapping } from "../data/categoryMapping";

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Asigna categorías basándose en el mapeo y datos del producto.
  const mapCategorias = (producto) => {
    const findCategory = (mapping, linea, grupo) => {
      for (const [key, value] of Object.entries(mapping)) {
        if (value.codes?.includes(producto.CODIGO)) return key;
        if (value.lineas?.includes(linea)) return key;
        if (value.grupos?.includes(grupo)) return key;
        if (value.subcategories) {
          const result = findCategory(value.subcategories, linea, grupo);
          if (result) return `${key} > ${result}`;
        }
      }
      return null;
    };
    return findCategory(categoryMapping, producto.LINEA, producto.GRUPO) || "Otros";
  };

  // Carga y procesa el archivo CSV.
  const loadProductos = useCallback(async () => {
    try {
      const response = await fetch("/data/inventario.csv");
      if (!response.ok) throw new Error("Network response was not ok");

      const buffer = await response.arrayBuffer();
      const csvText = new TextDecoder('windows-1252').decode(buffer);

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedProductos = results.data
            .filter(item => item.DETALLE && item.PRECIO)
            .map(item => ({
              id: item.CODIGO || Math.random().toString(36).substr(2, 9),
              nombre: item.DETALLE,
              stock: item.STOCK || "0",
              precio: item.PRECIO,
              categoria: mapCategorias(item),
              LINEA: item.LINEA || "Sin LINEA",
              GRUPO: item.GRUPO || "Sin GRUPO",
              image: getPlaceholderImage(item.CODIGO || Math.random().toString(36).substr(2, 9)),
            }));
          setProductos(parsedProductos);
          setIsLoading(false);
        },
        error: (err) => {
          console.error("Error parsing CSV:", err);
          setError("Hubo un problema al parsear los productos.");
          setIsLoading(false);
        },
      });
    } catch (err) {
      console.error("Error al cargar el archivo CSV:", err);
      setError("Hubo un problema al cargar los productos.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProductos();
  }, [loadProductos]);

  return { productos, isLoading, error };
};
