// src/App.js
// Componente principal de la aplicación, que configura el enrutamiento y estructura de la página.
// Incluye una barra de navegación, contenido principal con rutas, botón para volver al inicio de la página, y el pie de página.


// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { CarritoProvider } from "./components/CarritoContext"; // Importa el proveedor
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import ProductDetails from "./components/ProductDetails";
import SobreNosotros from "./pages/SobreNosotros";
import Contacto from "./pages/Contacto";
import ScrollToTop from "./components/ScrollToTop";
import Farmacia1 from "./pages/Farmacia1";
import Farmacia2 from "./pages/Farmacia2";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Carrito from "./pages/Carrito";

function App() {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const fetchRoles = async () => {
      if (isAuthenticated) {
        const claims = await getIdTokenClaims();
        const roles = claims?.["https://farmahorro.com/roles"] || [];
        setIsAdmin(roles.includes("admin"));
      }
    };

    fetchRoles();
  }, [isAuthenticated, getIdTokenClaims]);

  return (
    <Router>
      <CarritoProvider> {/* Proveedor envuelve la aplicación */}
      <div className="d-flex flex-column min-vh-100">
        <NavigationBar />
        <div className="flex-grow-1">
          <Routes>
            {/* Rutas para cada página de la aplicación */}
            <Route path="/" element={<Inicio />} /> {/* Página de inicio */}
            <Route path="/productos/*" element={<Productos />} /> {/* Página de productos */}
            <Route path="/producto/:productId" element={<ProductDetails />} /> {/* Detalles del producto */}
            <Route path="/sobre-nosotros" element={<SobreNosotros />} /> {/* Página de información sobre la empresa */}
            <Route path="/contacto" element={<Contacto />} /> {/* Página de contacto */}
            <Route path="/carrito" element={<Carrito />} />
            {/* Rutas de las sucursales */}
            <Route path="/farmacia1" element={<Farmacia1 />} />
            <Route path="/farmacia2" element={<Farmacia2 />} />
            <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
            <Route path="/user-dashboard" element={isAuthenticated ? <ClientDashboard /> : <Navigate to="/" />} />
          </Routes>
        </div>
        <ScrollToTop />
        <Footer />
      </div>
      </CarritoProvider>
    </Router>
  );
}

export default App;