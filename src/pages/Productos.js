import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Card, Row, Col, Button } from 'react-bootstrap';

const listaProductos = [
  {
    id: 1,
    nombre: 'Paracetamol',
    descripcion: 'Analgésico y antipirético',
    imagen: 'ruta-a-imagen-paracetamol.jpg',
  },
  {
    id: 2,
    nombre: 'Ibuprofeno',
    descripcion: 'Antiinflamatorio no esteroideo',
    imagen: 'ruta-a-imagen-ibuprofeno.jpg',
  },
  {
    id: 3,
    nombre: 'Aspirina',
    descripcion: 'Analgésico y anticoagulante',
    imagen: 'ruta-a-imagen-aspirina.jpg',
  },
  // Añade más productos según sea necesario
];

function Productos() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    // Simulamos la obtención de productos
    setProductos(listaProductos);
    setProductosFiltrados(listaProductos);
  }, []);

  const manejarBusqueda = (termino) => {
    const filtrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(termino.toLowerCase())
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
            <Card className="h-100">
              <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Button variant="primary">Ver detalles</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Productos;