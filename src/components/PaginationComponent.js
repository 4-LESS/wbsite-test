// src/components/PaginationComponent.js

// Manejar paginacion del sitio

import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const items = [];
  const siblings = 1;
  const showLeftEllipsis = currentPage > siblings + 3;
  const showRightEllipsis = currentPage < totalPages - (siblings + 2);

  items.push(
    <Pagination.Item key={1} active={1 === currentPage} onClick={() => onPageChange(1)}>
      1
    </Pagination.Item>
  );

  if (showLeftEllipsis) items.push(<Pagination.Ellipsis key="start-ellipsis" />);

  const start = Math.max(2, currentPage - siblings);
  const end = Math.min(totalPages - 1, currentPage + siblings);

  for (let i = start; i <= end; i++) {
    items.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
        {i}
      </Pagination.Item>
    );
  }

  if (showRightEllipsis) items.push(<Pagination.Ellipsis key="end-ellipsis" />);

  items.push(
    <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => onPageChange(totalPages)}>
      {totalPages}
    </Pagination.Item>
  );

  return <Pagination className="justify-content-center mt-4">{items}</Pagination>;
};

export default PaginationComponent;