// src/components/Anuncios.js

// Componente de carrusel que muestra anuncios o novedades usando react-bootstrap Carousel.
// Las imágenes se cargan desde la carpeta de assets en formato .webp para mejor rendimiento.

import React from 'react';
import { Carousel } from 'react-bootstrap';

function Anuncios() {
  // Lista de objetos de novedades, cada uno contiene la ruta de la imagen, texto alternativo y un caption
  const novedades = [
    {
      src: require('../assets/images/source1.webp'), // Ruta de la imagen (reemplaza según sea necesario)
      alt: 'Novedad 1', // Texto alternativo para accesibilidad
      caption: '', // Texto opcional para mostrar como título o descripción
    },
    {
      src: require('../assets/images/source2.webp'), // Otra imagen en formato .webp para optimización
      alt: 'Novedad 2',
      caption: '',
    },
    {
      src: require('../assets/images/source3.webp'),
      alt: 'Novedad 3',
      caption: '',
    },
  ];

  return (
    <Carousel>
      {/* Mapeo de cada novedad para crear un elemento del carrusel */}
      {novedades.map((item, index) => (
        <Carousel.Item key={index}>
          {/* Imagen de cada novedad. El estilo asegura que se adapte a distintos tamaños de pantalla */}
          <img
            className="d-block w-100"
            src={item.src}
            alt={item.alt}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '550px', // Limita la altura máxima del carrusel
              objectFit: 'cover', // Mantiene la imagen centrada y recortada sin deformarse
            }}
          />
          {/* Opcional: Caption de la imagen. Puede usarse para mostrar un título o descripción */}
          <Carousel.Caption>
            <h3>{item.caption}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Anuncios;
