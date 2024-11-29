import React, { createContext, useState, useContext, useEffect } from "react";

// Crear el contexto del carrito
const CarritoContext = createContext();

// Proveedor del contexto del carrito
export const CarritoProvider = ({ children }) => {
  // Cargar el carrito desde localStorage al inicio
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    if (!producto || !producto.id || !producto.precio) {
      console.error("Producto inválido:", producto);
      return;
    }

    // Normaliza el precio a un formato numérico
    const precioNormalizado =
      typeof producto.precio === "string"
        ? parseFloat(producto.precio.replace(/\./g, "").replace(",", "."))
        : producto.precio;

    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      // Verifica si la cantidad actual + 1 supera el stock disponible
      if (productoExistente.cantidad < producto.stock) {
        setCarrito(
          carrito.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        );
      } else {
        alert(`No puedes agregar más de ${producto.stock} unidades de este producto.`);
      }
    } else {
      // Si no existe en el carrito, verifica que el stock sea mayor a 0
      if (producto.stock > 0) {
        setCarrito([
          ...carrito,
          { ...producto, precio: precioNormalizado, cantidad: 1 },
        ]);
      } else {
        alert("Este producto no tiene stock disponible.");
      }
    }
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  // Función para actualizar la cantidad de un producto
  const actualizarCantidad = (id, cantidad) => {
    setCarrito(
      carrito.map((item) =>
        item.id === id ? { ...item, cantidad: cantidad } : item
      )
    );
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// Hook para consumir el contexto del carrito
export const useCarrito = () => useContext(CarritoContext);