// src/components/PaginationComponent.js

// Componente de paginación que permite navegar entre páginas de contenido.
// Genera una serie de botones de página, con el manejo de elipsis para acortar la lista de páginas visibles.

import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  // Si solo hay una página, no se muestra la paginación
  if (totalPages <= 1) return null;

  const items = []; // Almacena los elementos de paginación (botones y elipsis)
  const siblings = 1; // Número de páginas que se muestran antes y después de la página actual
  const showLeftEllipsis = currentPage > siblings + 3; // Muestra elipsis al inicio si hay muchas páginas antes de la actual
  const showRightEllipsis = currentPage < totalPages - (siblings + 2); // Muestra elipsis al final si hay muchas páginas después de la actual

  // Botón para la primera página
  items.push(
    <Pagination.Item key={1} active={1 === currentPage} onClick={() => onPageChange(1)}>
      1
    </Pagination.Item>
  );

  // Añade elipsis al inicio si es necesario
  if (showLeftEllipsis) items.push(<Pagination.Ellipsis key="start-ellipsis" />);

  // Determina el rango de páginas que se mostrarán alrededor de la página actual
  const start = Math.max(2, currentPage - siblings);
  const end = Math.min(totalPages - 1, currentPage + siblings);

  // Agrega botones de página para el rango calculado
  for (let i = start; i <= end; i++) {
    items.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
        {i}
      </Pagination.Item>
    );
  }

  // Añade elipsis al final si es necesario
  if (showRightEllipsis) items.push(<Pagination.Ellipsis key="end-ellipsis" />);

  // Botón para la última página
  items.push(
    <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => onPageChange(totalPages)}>
      {totalPages}
    </Pagination.Item>
  );

  // Renderiza el componente de paginación centrado
  return <Pagination className="justify-content-center mt-4">{items}</Pagination>;
};

export default PaginationComponent;
