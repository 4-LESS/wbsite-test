// src/hooks/useProductos.js
// Logica para cargar archivos desde public/data/inventario.csv

import { useState, useEffect, useCallback } from "react";
import Papa from "papaparse";
import { getPlaceholderImage } from "../utils/helpers";

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
