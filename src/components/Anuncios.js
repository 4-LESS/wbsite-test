// src/components/Anuncios.js
import React from 'react';
import { Carousel } from 'react-bootstrap';

function Anuncios() {
  const novedades = [
    {
      src: require('../assets/images/source1.webp'), // Reemplaza con la ruta de la imagen
      alt: 'Novedad 1',
      caption: '',
    },
    {
      src: require('../assets/images/source2.webp'), // Otra imagen en formato .webp
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
      {novedades.map((item, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={item.src}
            alt={item.alt}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '550px',
              objectFit: 'cover',
            }}
          />
          <Carousel.Caption>
            <h3>{item.caption}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Anuncios;





