// src/components/ScrollToTop.js

// Componente que muestra un botón para desplazarse al inicio de la página.
// El botón aparece cuando el usuario ha hecho scroll hacia abajo por más de 300px.

import React, { useState, useEffect } from 'react';

function ScrollToTop() {
  const [visible, setVisible] = useState(false); // Estado que controla la visibilidad del botón

  // Muestra el botón cuando el usuario ha hecho scroll más de 300px
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    scrolled > 300 ? setVisible(true) : setVisible(false);
  };

  // Función que realiza el desplazamiento hacia la parte superior de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Desplazamiento suave
    });
  };

  // Añade y limpia el evento de scroll para controlar la visibilidad del botón
  useEffect(() => {
    window.addEventListener('scroll', toggleVisible); // Escucha el evento de scroll
    return () => window.removeEventListener('scroll', toggleVisible); // Limpia el evento al desmontar el componente
  }, []);

  return (
    <button
      onClick={scrollToTop} // Llama a scrollToTop al hacer clic en el botón
      className="scroll-to-top" // Clase para aplicar estilos al botón
      style={{ display: visible ? 'inline' : 'none' }} // Muestra u oculta el botón basado en el estado
    >
      ↑
    </button>
  );
}

export default ScrollToTop;

