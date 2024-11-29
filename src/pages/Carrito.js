import React, { useState } from "react";
import { useCarrito } from "../components/CarritoContext";
import { Container, Table, Button, Alert } from "react-bootstrap";

const Carrito = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidad } = useCarrito();
  const [mostrarAlerta, setMostrarAlerta] = useState(false); // Estado para controlar la alerta

  const calcularTotal = () =>
    carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

  // Función para mostrar alerta al pulsar "Pagar"
  const handlePagar = () => {
    setMostrarAlerta(true); // Activa la alerta
    setTimeout(() => setMostrarAlerta(false), 3000); // Oculta la alerta después de 3 segundos
  };

  // Función para manejar el cambio de cantidad directamente en el carrito
  const handleCantidadChange = (id, nuevaCantidad, stock) => {
    if (nuevaCantidad > stock) {
      alert(`No puedes agregar más de ${stock} unidades de este producto.`);
    } else if (nuevaCantidad < 1) {
      alert("La cantidad no puede ser menor a 1.");
    } else {
      actualizarCantidad(id, nuevaCantidad); // Actualiza la cantidad si es válida
    }
  };

  if (carrito.length === 0) {
    return (
      <Container className="text-center my-5">
        <h3>Tu carrito está vacío</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2>Carrito de Compras</h2>
      {mostrarAlerta && (
        <Alert variant="info" className="text-center">
          ¡Ups! El programador aún no ha implementado esta función
        </Alert>
      )}
      <Table striped bordered>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>
                {new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                }).format(item.precio)}
              </td>
              <td>
                <input
                  type="number"
                  value={item.cantidad}
                  min="1"
                  onChange={(e) =>
                    handleCantidadChange(
                      item.id,
                      parseInt(e.target.value),
                      item.stock
                    )
                  }
                />
              </td>
              <td>
                {new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                }).format(item.precio * item.cantidad)}
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>
        Total:{" "}
        {new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
        }).format(calcularTotal())}
      </h3>
      <Button variant="success" className="mt-3" size="lg" onClick={handlePagar}>
        Pagar
      </Button>
    </Container>
  );
};

export default Carrito;
