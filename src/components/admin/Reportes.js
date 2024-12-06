import React, { useState } from "react";
import Estadisticas from "./admin/Estadisticas"; 

// Componente para estadísticas y reportes
const Reportes = () => {
  const [viewStatistics, setViewStatistics] = useState(false);

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "estadisticas.png";
      link.click();
    } else {
      alert("No hay gráficos para descargar.");
    }
  };

  return (
    <div className="admin-section">
      <h2>Estadísticas y Reportes</h2>
      <p>Consulta estadísticas de ventas, usuarios y pedidos.</p>

      {!viewStatistics ? (
        <div>
          <button className="btn-primary" onClick={() => setViewStatistics(true)}>
            Ver Estadísticas
          </button>
          <button className="btn-secondary" onClick={handleDownload}>
            Descargar Estadísticas
          </button>
        </div>
      ) : (
        <Estadisticas />
      )}
    </div>
  );
};

export default Reportes;
