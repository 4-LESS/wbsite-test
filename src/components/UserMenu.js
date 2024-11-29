import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom"; // Importa el componente Link
import "../styles/SharedMenuStyles.scss"; // Estilos compartidos

function UserMenu() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const [userRole, setUserRole] = useState(null); // 'admin' o 'client'
  const [menuVisible, setMenuVisible] = useState(false); // Controla si el menú es visible

  useEffect(() => {
    const fetchRoles = async () => {
      if (isAuthenticated) {
        try {
          const claims = await getIdTokenClaims();
          const roles = claims?.["https://farmahorro.com/roles"] || [];
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

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  if (isLoading) {
    return (
      <div className="user-menu">
        <div className="user-menu-icon">
          <FontAwesomeIcon icon={faUser} size="lg" className="text-secondary" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="user-menu">
        <div className="user-menu-icon" onClick={() => loginWithRedirect()}>
          <FontAwesomeIcon icon={faUser} size="lg" className="text-secondary" />
        </div>
      </div>
    );
  }

  return (
    <div className="user-menu">
      <div className="user-menu-icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faUser} size="lg" className="text-secondary" />
      </div>

      <CSSTransition
        in={menuVisible}
        timeout={300}
        classNames="dropdown"
        unmountOnExit
      >
        <div className="user-menu-dropdown">
          {userRole === "admin" && (
            <div className="dropdown-item" onClick={() => setMenuVisible(false)}>
              <Link to="/admin">Panel de Administración</Link>
            </div>
          )}
          {userRole === "client" && (
            <div className="dropdown-item" onClick={() => setMenuVisible(false)}>
              <Link to="/user-dashboard">Mi Cuenta</Link>
            </div>
          )}
          <div
            className="dropdown-item"
            onClick={() => {
              setMenuVisible(false);
              logout({ logoutParams: { returnTo: window.location.origin } });
            }}
          >
            Cerrar Sesión
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default UserMenu;
