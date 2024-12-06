const express = require("express");
const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const app = express();
const port = process.env.PORT || 3001;

// Instancia del cliente de Google Analytics
const analyticsClient = new BetaAnalyticsDataClient();

app.get("/api/analytics/hourly", async (req, res) => {
  try {
    const propertyId = process.env.GA_PROPERTY_ID; // Usamos la variable de entorno para el ID de la propiedad
    const [response] = await analyticsClient.runReport({
      property: `properties/${propertyId}`, // La propiedad de Analytics
      dimensions: [{ name: "hour" }], // Dimensión: hora
      metrics: [{ name: "activeUsers" }], // Métrica: usuarios activos
    });

    // Procesar los datos obtenidos
    const formattedData = response.rows.map((row) => ({
      hour: row.dimensionValues[0].value,
      activeUsers: row.metricValues[0].value,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).send("Error al obtener datos de Google Analytics.");
  }
});

// Arranque del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

