// src/components/DropDownMenu

// Este componente crea un menú desplegable para categorizar productos, mostrando subcategorías de manera recursiva.
// Es útil para organizar visualmente las categorías en un formato jerárquico.

// Importaciones necesarias
import React from 'react';
import { Link } from 'react-router-dom'; // Permite la navegación entre rutas en la aplicación.
import { Dropdown } from 'react-bootstrap'; // Proporciona componentes para crear menús desplegables.
import { categoryMapping } from '../data/categoryMapping'; // Mapeo de categorías dinámico.

// Componente principal que representa el menú desplegable de categorías.
function DropdownMenu() {
  /**
   * Función recursiva para renderizar los elementos del menú.
   * @param {Object} categories - Estructura jerárquica de categorías.
   * @param {string} parentPath - Ruta acumulada de la categoría padre.
   * @returns {JSX.Element[]} Lista de elementos del menú.
   */
  const renderMenuItems = (categories, parentPath = '') => {
    // Iteramos sobre las claves (nombres de las categorías) del objeto de categorías.
    return Object.keys(categories).map((categoryName, index) => {
      const categoryData = categories[categoryName]; // Información de la categoría actual.
      const path = parentPath ? `${parentPath} > ${categoryName}` : categoryName; // Construye la ruta completa de la categoría.

      // Verificamos si la categoría tiene subcategorías.
      if (categoryData.subcategories && Object.keys(categoryData.subcategories).length > 0) {
        return (
          <Dropdown key={index} drop="end" className="dropdown-submenu">
            {/* Botón que representa la categoría y muestra subcategorías al interactuar. */}
            <Dropdown.Toggle as="div" className="dropdown-item">
              {categoryName}
            </Dropdown.Toggle>
            {/* Llamada recursiva para renderizar las subcategorías. */}
            <Dropdown.Menu>
              {renderMenuItems(categoryData.subcategories, path)}
            </Dropdown.Menu>
          </Dropdown>
        );
      } else {
        // Caso base: Categoría sin subcategorías.
        return (
          <Dropdown.Item
            as={Link}
            to={`/productos?categoria=${encodeURIComponent(path)}`} // Ruta codificada para la categoría actual.
            key={index}
          >
            {categoryName} {/* Nombre de la categoría mostrado al usuario. */}
          </Dropdown.Item>
        );
      }
    });
  };

  // Renderizamos el menú principal llamando a la función recursiva con la estructura de categorías.
  return <>{renderMenuItems(categoryMapping)}</>;
}

// Exportamos el componente para su uso en otras partes de la aplicación.
export default DropdownMenu;

