# Sitio Web FarmAhorro

Este es un proyecto web diseñado para gestionar y visualizar productos, horarios de sucursales y otras características de la farmacia **FarmAhorro**. La aplicación permite a los usuarios buscar productos, filtrar por categorías, ver sucursales, y acceder a información de contacto.

## Características

- **Página de Inicio**: Con carrusel de anuncios, bienvenida y características de los servicios de la farmacia.
- **Productos**: Listado de productos con búsqueda y filtrado dinámico por línea y grupo, con paginación.
- **Sucursales**: Información sobre dos ubicaciones de FarmAhorro, incluyendo horarios de atención.
- **Contacto**: Formulario de contacto con validación y un mapa de ubicación integrado.

## Requisitos Previos

- **Node.js** y **npm**: Asegúrate de tener ambos instalados. Puedes descargarlos desde [https://nodejs.org/](https://nodejs.org/).
- **Git**: Para clonar el repositorio.

## Instalación

Sigue estos pasos para instalar el proyecto en tu máquina local:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/4-LESS/INGESO
2. **Navega al directorio del proyecto**:
   ```bash
    cd INGESO
3. **Instala las dependencias**:
   ```bash
   npm install
4. **Inicia la aplicación en modo de desarrollo**
   ```bash
   npm start
   ```
   Tambien se puede iniciar usando las funciones de Netlify
   ```bash
   netlify dev
   ```
Esto abrirá la aplicación en http://localhost:3000 en tu navegador.

## Estructura

- **src/components**: Componentes reutilizables como la barra de navegación, footer, barra de búsqueda, filtros de productos, etc.
- **src/pages**: Contiene las páginas principales como Inicio, Productos, SobreNosotros, y Contacto.
- **src/hooks**: Hooks personalizados, como useProductos para cargar el inventario desde un CSV y useFilteredProducts para manejar los filtros de productos.
- **public/data**: Ubicación del archivo inventario.csv que contiene los datos del inventario de productos.

## Notas de Desarrollo
### Configuración de Axios
El archivo src/api.js contiene la configuración de Axios, aunque actualmente no está en uso debido a limitaciones de la API.

### Archivo CSV de Inventario
Para cargar productos, el archivo inventario.csv debe estar en public/data y debe incluir los campos DETALLE, LINEA, GRUPO, STOCK, PRECIO, y CODIGO para que se muestren correctamente.

### Estilos y Animaciones
El proyecto utiliza animaciones de animate.css y componentes estilizados con React-Bootstrap y clases personalizadas en App.css.

# :P
