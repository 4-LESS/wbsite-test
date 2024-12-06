// src/components/Anuncios.js

import React from 'react';
import { Carousel } from 'react-bootstrap';

function Anuncios() {
  const novedades = [
    {
      src: require('../assets/images/source1.webp'),
      alt: 'Novedad 1',
    },
    {
      src: require('../assets/images/source2.webp'),
      alt: 'Novedad 2',
    },
    {
      src: require('../assets/images/source3.webp'),
      alt: 'Novedad 3',
    },
  ];

  return (
    <div 
      style={{ 
        borderRadius: '10px', 
        overflow: 'hidden', 
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
      }}
    >
      <Carousel 
        interval={4000} 
        pause={true} 
        controls={true} 
        indicators={true}
        variant="dark"
      >
        {novedades.map((item, index) => (
          <Carousel.Item key={index}>
            <div style={{ position: 'relative' }}>
              {/* Imagen */}
              <img
                className="d-block w-100"
                src={item.src}
                alt={item.alt}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '550px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              {/* Overlay degradado sutil en la parte inferior */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '30%',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.3))'
                }}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Anuncios;

