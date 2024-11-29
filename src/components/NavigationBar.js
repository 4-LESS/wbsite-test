// src/components/NavigationBar.js

// Componente de barra de navegación que incluye un logo, un menú de categorías, un campo de búsqueda,
// iconos de sucursales y carrito, y un enlace a varias secciones de la página. También incluye un modal para seleccionar sucursales.

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/SearchBar";
import ModalSucursales from './ModalSucursales';
import CarritoIcon from "./CarritoIcon"; 

function NavigationBar() {
  // Estado del modal de sucursales y término de búsqueda
  const [showSucursales, setShowSucursales] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");  // Estado para el término de búsqueda
  
  const navigate = useNavigate();
  const location = useLocation();

  // Abre y cierra el modal de sucursales
  const handleOpenSucursales = () => setShowSucursales(true);
  const handleCloseSucursales = () => setShowSucursales(false);

  // Maneja la búsqueda: guarda el término y redirige a la página de productos con el término de búsqueda en la URL
  const handleSearchSubmit = (termino) => {
    if (termino) {
      setSearchTerm(termino); // Guardar el término de búsqueda en el estado
      navigate(`/productos?search=${encodeURIComponent(termino)}`);
    }
  };

  // Restablece el campo de búsqueda al cambiar de ruta
  useEffect(() => {
    setSearchTerm(""); // Limpiar el término de búsqueda
  }, [location.pathname]);

  // Elimina el término de búsqueda de la URL si no estamos en la página de productos
  useEffect(() => {
    if (!location.pathname.startsWith("/productos")) {
      const params = new URLSearchParams(location.search);
      if (params.has("search")) {
        params.delete("search");
        navigate({
          pathname: location.pathname,
          search: params.toString(),
        });
      }
    }
  }, [location, navigate]);

  return (
    <>
      {/* Barra de navegación superior con logo, menú de categorías, campo de búsqueda e iconos */}
      <div className="navbar-top py-2">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {/* Logo de FarmAhorro, enlazado a la página de inicio */}
            <Link to="/">
              <img
                src={require("../assets/images/logo_farmahorro.png")}
                alt="FarmAhorro Logo"
                style={{ width: "150px", marginRight: "30px" }}
              />
            </Link>
            {/* Menú desplegable con categorías de productos */}
            <Dropdown>
              <Dropdown.Toggle as="div" className="d-flex align-items-center mx-3">
                <div className="menu-circle d-flex align-items-center justify-content-center">
                  <FontAwesomeIcon icon={faBars} className="text-white" style={{ fontSize: "20px" }} />
                </div>
                <span className="ms-2 text-secondary">Menú</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/productos">Productos</Dropdown.Item>
                <Dropdown.Divider />
                {/* Cada elemento del menú redirige a una categoría específica de productos */}
                <Dropdown.Item as={Link} to="/productos?categoria=cosmetica">Cosmética</Dropdown.Item>
                <Dropdown.Item as={Link} to="/productos?categoria=bebe">Cuidado de bebé</Dropdown.Item>
                <Dropdown.Item as={Link} to="/productos?categoria=medicamentos">Medicamentos</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* Barra de búsqueda */}
          <div className="mx-3" style={{ flexGrow: 1 }}>
            <SearchBar onSearchSubmit={handleSearchSubmit} defaultValue={searchTerm} />
          </div>
          {/* Iconos de sucursales y carrito de compras */}
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" className="icono-sucursales" />
            <span className="button-sucursales" onClick={handleOpenSucursales}>Sucursales</span>
            <CarritoIcon />
          </div>
        </Container>
      </div>
      
      {/* Barra de navegación inferior con enlaces a diferentes secciones */}
      <Navbar className="navbar-bottom" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
              <Nav.Link as={Link} to="/sobre-nosotros">Sobre Nosotros</Nav.Link>
              <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal para mostrar y seleccionar sucursales */}
      <ModalSucursales show={showSucursales} onHide={handleCloseSucursales} />
    </>
  );
}

export default NavigationBar;