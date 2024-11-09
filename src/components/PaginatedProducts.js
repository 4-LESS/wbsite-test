// src/components/PaginatedProducts.js

// Componente para mostrar una lista de productos en una vista paginada.
// Utiliza react-bootstrap para el diseño y muestra un número específico de productos por página (ITEMS_PER_PAGE).

import React, { useMemo } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import PaginationComponent from "./PaginationComponent";

// Número máximo de productos que se muestran por página
const ITEMS_PER_PAGE = 12;

const PaginatedProducts = ({ productos, currentPage, onPageChange }) => {
  // Calcula el total de páginas basado en el número de productos
  const totalPages = Math.ceil(productos.length / ITEMS_PER_PAGE);

  // Memoiza el cálculo de los productos para la página actual
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return productos.slice(start, start + ITEMS_PER_PAGE);
  }, [productos, currentPage]);

  return (
    <>
      {/* Renderiza una fila de productos con cada producto en su propia tarjeta */}
      <Row>
        {currentItems.map(({ id, nombre, stock, precio, image }) => (
          <Col key={id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              {/* Imagen del producto */}
              <Card.Img 
                variant="top" 
                src={image} 
                alt={nombre} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <Card.Body>
                {/* Nombre del producto */}
                <Card.Title>{nombre}</Card.Title>
                {/* Estado de stock, muestra "Agotado" si no hay inventario */}
                <Card.Text>
                  {stock === "0" ? "Agotado" : `Stock: ${stock}`}
                </Card.Text>
                {/* Precio del producto */}
                <Card.Text>Precio: ${precio}</Card.Text>
                {/* Botón para ver más detalles del producto */}
                <Button variant="primary">Ver detalles</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* Componente de paginación para navegar entre páginas */}
      <PaginationComponent 
        totalPages={totalPages} 
        currentPage={currentPage} 
        onPageChange={onPageChange} 
      />
    </>
  );
};

export default PaginatedProducts;
