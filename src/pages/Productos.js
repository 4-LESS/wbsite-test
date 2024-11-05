import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { Card, Row, Col } from "react-bootstrap";
import api from "../api";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await api.get("products");
      setProductos(response.data);
      setProductosFiltrados(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const manejarBusqueda = (termino) => {
    const filtrados = productos.filter((producto) =>
      producto.title.toLowerCase().includes(termino.toLowerCase()),
    );
    setProductosFiltrados(filtrados);
  };

  return (
    <div className="container my-4">
      <h1>Productos</h1>
      <SearchBar onSearch={manejarBusqueda} />
      <Row>
        {productosFiltrados.map((producto) => (
          <Col key={producto.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              {producto.image && (
                <Card.Img
                  variant="top"
                  src={producto.image}
                  alt={producto.title}
                />
              )}
              <Card.Body>
                <Card.Title>{producto.title}</Card.Title>
                {/* (<Card.Text>{producto.description}</Card.Text>*/}
                <Card.Text>Precio: ${producto.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Productos;
