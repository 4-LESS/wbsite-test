// src/App.js
// Componente principal de la aplicación, que configura el enrutamiento y estructura de la página.
// Incluye una barra de navegación, contenido principal con rutas, botón para volver al inicio de la página, y el pie de página.


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import ProductDetails from "./components/ProductDetails"; // Importa el componente de detalles
import SobreNosotros from "./pages/SobreNosotros";
import Contacto from "./pages/Contacto";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Barra de navegación fija en la parte superior de la aplicación */}
        <NavigationBar />

        {/* Contenedor del contenido principal, con enrutamiento para cada página */}
        <div className="flex-grow-1">
          <Routes>
            {/* Rutas para cada página de la aplicación */}
            <Route path="/" element={<Inicio />} /> {/* Página de inicio */}
            <Route path="/productos/*" element={<Productos />} /> {/* Página de productos */}
            <Route path="/producto/:productId" element={<ProductDetails />} /> {/* Detalles del producto */}
            <Route path="/sobre-nosotros" element={<SobreNosotros />} /> {/* Página de información sobre la empresa */}
            <Route path="/contacto" element={<Contacto />} /> {/* Página de contacto */}
          </Routes>
        </div>

        {/* Componente para volver al inicio de la página al hacer scroll y pie de página */}
        <ScrollToTop /> {/* Botón para volver al inicio al hacer scroll */}
        <Footer /> {/* Pie de página con información adicional */}
      </div>
    </Router>
  );
}

export default App;

