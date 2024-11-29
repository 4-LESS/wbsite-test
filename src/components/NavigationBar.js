// src/components/NavigationBar.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/SearchBar";
import ModalSucursales from "./ModalSucursales";
import UserMenu from "./UserMenu"; // Importa el nuevo componente

function NavigationBar() {
  const [showSucursales, setShowSucursales] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenSucursales = () => setShowSucursales(true);
  const handleCloseSucursales = () => setShowSucursales(false);

  const handleSearchSubmit = (termino) => {
    if (termino) {
      setSearchTerm(termino);
      navigate(`/productos?search=${encodeURIComponent(termino)}`);
    }
  };

  useEffect(() => {
    setSearchTerm("");
  }, [location.pathname]);

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
      {/* Barra de navegación superior */}
      <div className="navbar-top py-2">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link to="/">
              <img
                src={require("../assets/images/logo_farmaahorro.png")}
                alt="FarmAhorro Logo"
                style={{ width: "150px", marginRight: "30px" }}
              />
            </Link>
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
                <Dropdown.Item as={Link} to="/productos?categoria=cosmetica">Cosmética</Dropdown.Item>
                <Dropdown.Item as={Link} to="/productos?categoria=bebe">Cuidado de bebé</Dropdown.Item>
                <Dropdown.Item as={Link} to="/productos?categoria=medicamentos">Medicamentos</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="mx-3" style={{ flexGrow: 1 }}>
            <SearchBar onSearchSubmit={handleSearchSubmit} defaultValue={searchTerm} />
          </div>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" className="icono-sucursales" />
            <span className="button-sucursales" onClick={handleOpenSucursales}>Sucursales</span>
            <Link to="/carrito" className="ms-3 text-secondary">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </Link>
            {/* Menú de usuario */}
            <UserMenu />
          </div>
        </Container>
      </div>

      {/* Barra de navegación inferior */}
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

      {/* Modal de Sucursales */}
      <ModalSucursales show={showSucursales} onHide={handleCloseSucursales} />
    </>
  );
}

export default NavigationBar;
