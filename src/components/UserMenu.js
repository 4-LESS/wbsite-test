import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function UserMenu() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const [userRole, setUserRole] = useState(null); // 'admin' o 'client'

  useEffect(() => {
    const fetchRoles = async () => {
      if (isAuthenticated) {
        try {
          const claims = await getIdTokenClaims();
          console.log("Claims obtenidas:", claims); // Verifica dónde están los roles
          const roles = claims?.["https://farmahorro.com/roles"] || []; // Cambia a la clave correcta
          console.log("Roles obtenidos:", roles); // Depuración
          if (roles.includes("admin")) {
            setUserRole("admin");
          } else if (roles.includes("client")) {
            setUserRole("client");
          } else {
            setUserRole(null); // Sin roles asignados
          }
        } catch (error) {
          console.error("Error al obtener los roles:", error);
        }
      }
    };

    fetchRoles();
  }, [isAuthenticated, getIdTokenClaims]);

  if (isLoading) {
    return (
      <Dropdown align="end" className="ms-3">
        <Dropdown.Toggle id="dropdown-user" style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faUser} size="lg" className="text-secondary" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item disabled>Cargando...</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  if (!isAuthenticated) {
    return (
      <Dropdown align="end" className="ms-3">
        <Dropdown.Toggle id="dropdown-user" style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faUser} size="lg" className="text-secondary" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => loginWithRedirect()}>Iniciar Sesión</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <Dropdown align="end" className="ms-3">
      <Dropdown.Toggle id="dropdown-user" style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon={faUser} size="lg" className="text-secondary" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {userRole === "admin" && (
          <Dropdown.Item as={Link} to="/admin">Panel de Administración</Dropdown.Item>
        )}
        {userRole === "client" && (
          <Dropdown.Item as={Link} to="/user-dashboard">Mi Cuenta</Dropdown.Item>
        )}
        <Dropdown.Item
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Cerrar Sesión
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserMenu;

