import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/SearchBar";

function ModalSucursales({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sucursales</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Button
          variant="outline-primary"
          className="mb-3"
          as={Link}
          to="/sucursal1"
        >
          Farmacia 1
        </Button>
        <Button
          variant="outline-primary"
          className="mb-3"
          as={Link}
          to="/sucursal2"
        >
          Farmacia 2
        </Button>
      </Modal.Body>
    </Modal>
  );
}

function NavigationBar() {
  const [showSucursales, setShowSucursales] = useState(false);
  const navigate = useNavigate();

  const handleOpenSucursales = () => setShowSucursales(true);
  const handleCloseSucursales = () => setShowSucursales(false);

  const handleSearch = (termino) => {
    if (termino) {
      navigate(`/productos?search=${encodeURIComponent(termino)}`);
    }
  };

  return (
    <>
      {/* Primera sección: Menú, Logo y Barra de búsqueda */}
      <div className="navbar-top py-2">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {/* Logo con tamaño ajustado y espaciado */}
            <Link to="/">
              <img
                src={require("../logo_farmahorro.png")}
                alt="FarmAhorro Logo"
                style={{ width: "80px", marginRight: "20px" }}
              />
            </Link>

            <Dropdown>
              <Dropdown.Toggle
                as="div"
                className="d-flex align-items-center mx-3"
              >
                <div className="menu-circle d-flex align-items-center justify-content-center">
                  <FontAwesomeIcon
                    icon={faBars}
                    className="text-white"
                    style={{ fontSize: "20px" }}
                  />
                </div>
                <span className="ms-2 text-secondary">Menú</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/productos">
                  Productos
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/productos?categoria=cosmetica">
                  Cosmética
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/productos?categoria=bebe">
                  Cuidado de bebé
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/productos?categoria=medicamentos">
                  Medicamentos
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="mx-3" style={{ flexGrow: 1 }}>
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="d-flex align-items-center">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              size="lg"
              className="icono-sucursales"
            />
            <span className="button-sucursales" onClick={handleOpenSucursales}>
              Sucursales
            </span>
            <Link to="/carrito" className="ms-3 text-secondary">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </Link>
          </div>
        </Container>
      </div>

      {/* Segunda sección: Links de navegación en color de separador */}
      <Navbar className="navbar-bottom" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/productos">
                Productos
              </Nav.Link>
              <Nav.Link as={Link} to="/sobre-nosotros">
                Sobre Nosotros
              </Nav.Link>
              <Nav.Link as={Link} to="/contacto">
                Contacto
              </Nav.Link>
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
