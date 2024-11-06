import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";

function Productos() {
  // Estados para los productos, productos filtrados, término de búsqueda, carga y errores
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  // Efecto para obtener los productos al montar el componente
  useEffect(() => {
    obtenerProductos();
  }, []);

  // Efecto para actualizar el término de búsqueda cuando cambia la URL
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const searchTermFromURL = query.get("search") || "";
    setSearchTerm(searchTermFromURL);
  }, [location.search]);

  // Efecto para manejar la búsqueda cada vez que cambia el término de búsqueda o los productos
  useEffect(() => {
    manejarBusqueda(searchTerm);
  }, [searchTerm, productos]);

  // Función para obtener los productos desde la API
  const obtenerProductos = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Error en la respuesta de la red");
      }
      const productos = await response.json();
      setProductos(productos);
      setIsLoading(false); // Indicar que la carga ha finalizado
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setError(
        "Hubo un problema al cargar los productos. Por favor, intenta nuevamente más tarde.",
      );
      setIsLoading(false); // Asegurar que isLoading sea false incluso si hay un error
    }
  };

  // Función para manejar la búsqueda de productos
  const manejarBusqueda = (termino) => {
    if (productos.length > 0) {
      if (termino) {
        const filtrados = productos.filter(
          (producto) =>
            producto.title &&
            producto.title.toLowerCase().includes(termino.toLowerCase()),
        );
        setProductosFiltrados(filtrados);
      } else {
        setProductosFiltrados(productos);
      }
    }
  };

  return (
    <div className="container my-4">
      <h1>Productos</h1>
      <SearchBar
        onSearch={(termino) => {
          setSearchTerm(termino);
          // Actualizar el parámetro de búsqueda en la URL sin recargar la página
          const queryParams = new URLSearchParams(location.search);
          if (termino) {
            queryParams.set("search", termino);
          } else {
            queryParams.delete("search");
          }
          window.history.replaceState(
            null,
            "",
            `${location.pathname}?${queryParams.toString()}`,
          );
        }}
        defaultValue={searchTerm}
      />
      <Row>
        {isLoading ? (
          // Mostrar un spinner y mensaje mientras se cargan los productos
          <div className="text-center w-100 my-5">
            <Spinner animation="border" role="status" />
            <p className="mt-3">Buscando productos...</p>
          </div>
        ) : error ? (
          // Mostrar mensaje de error si ocurrió un problema al cargar los productos
          <div className="text-center w-100 my-5">
            <p className="text-danger">{error}</p>
          </div>
        ) : productosFiltrados.length === 0 ? (
          // Mostrar mensaje si no se encontraron productos después de cargar
          <div className="text-center w-100 my-5">
            <p>No se encontraron productos.</p>
          </div>
        ) : (
          // Renderizar los productos filtrados
          productosFiltrados.map((producto) => (
            <Col key={producto.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={producto.image}
                  alt={producto.title}
                />
                <Card.Body>
                  <Card.Title>{producto.title}</Card.Title>
                  <Card.Text>{producto.description}</Card.Text>
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
