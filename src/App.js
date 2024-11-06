import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import SobreNosotros from "./pages/SobreNosotros";
import Contacto from "./pages/Contacto";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Barra de navegación */}
        <NavigationBar />

        {/* Contenido principal */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </div>

        {/* Footer */}
        <ScrollToTop />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
