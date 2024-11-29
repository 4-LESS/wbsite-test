import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCarrito } from "./CarritoContext"; // Contexto del carrito

const CarritoIcon = () => {
  const { carrito } = useCarrito();

  // Calcula la cantidad total de productos en el carrito
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <div className="carrito-icon-container">
      <Link to="/carrito" className="text-secondary d-flex align-items-center">
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        {cantidadTotal > 0 && (
          <span className="carrito-badge">{cantidadTotal}</span>
        )}
      </Link>
    </div>
  );
};

export default CarritoIcon;