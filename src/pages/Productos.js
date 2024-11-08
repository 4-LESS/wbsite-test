// src/pages/Productos.js

import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);

  const location = useLocation();

  const manejarBusqueda = useCallback((termino) => {
    if (productos.length > 0) {
      if (termino) {
        const filtrados = productos.filter((producto) =>
          producto.name && producto.name.toLowerCase().includes(termino.toLowerCase())
        );
        setProductosFiltrados(filtrados);
      } else {
        setProductosFiltrados(productos);
      }
    }
  }, [productos]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const searchTermFromURL = query.get('search') || '';
    setSearchTerm(searchTermFromURL);
  }, [location.search]);

  useEffect(() => {
    manejarBusqueda(searchTerm);
  }, [searchTerm, manejarBusqueda]);

  useEffect(() => {
    let timeout;
    if (isLoading) {
      timeout = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 500);
    } else {
      setShowLoadingMessage(false);
    }
    return () => clearTimeout(timeout);
  }, [isLoading]);

  // Función para obtener los productos desde la función de Netlify
  const obtenerProductos = async () => {
    try {
      let url = `/.netlify/functions/getProducts`;
      if (searchTerm) {
        url += `?search=${encodeURIComponent(searchTerm)}`;
      }

      console.log("Solicitando a la URL:", url);

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta de la red");
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        throw new Error(`Respuesta no válida, se recibió HTML: ${textResponse}`);
      }

      const productos = await response.json();
      setProductos(productos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setError("Hubo un problema al cargar los productos. Por favor, intenta nuevamente más tarde.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h1>Productos</h1>
      <SearchBar
        onSearch={(termino) => {
          setSearchTerm(termino);
          const queryParams = new URLSearchParams(location.search);
          if (termino) {
            queryParams.set('search', termino);
          } else {
            queryParams.delete('search');
          }
          window.history.replaceState(null, '', `${location.pathname}?${queryParams.toString()}`);
        }}
        defaultValue={searchTerm}
      />
      <Row>
        {isLoading ? (
          showLoadingMessage && (
            <div className="text-center w-100 my-5">
              <Spinner animation="border" role="status" />
              <p className="mt-3">Buscando productos...</p>
            </div>
          )
        ) : error ? (
          <div className="text-center w-100 my-5">
            <p className="text-danger">{error}</p>
          </div>
        ) : productosFiltrados.length === 0 ? (
          <div className="text-center w-100 my-5">
            <p>No se encontraron productos.</p>
          </div>
        ) : (
          productosFiltrados.map((producto) => (
            <Col key={producto.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                {producto.images && producto.images.length > 0 && (
                  <Card.Img variant="top" src={producto.images[0].src} alt={producto.name} />
                )}
                <Card.Body>
                  <Card.Title>{producto.name}</Card.Title>
                  <Card.Text dangerouslySetInnerHTML={{ __html: producto.description }} />
                  <Card.Text>Precio: ${producto.price}</Card.Text>
                  <Button variant="primary">Ver detalles</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}

export default Productos;

