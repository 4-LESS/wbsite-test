// functions/getProducts.js

// Función para manejar solicitudes de una API externa con autenticación y configuración SSL.
// Actualmente, esta función no está siendo usada debido a conflictos en la API que aún no se han solucionado.
// La función utiliza axios para realizar una solicitud GET a la API especificada en el archivo de configuración.

// ToT

const axios = require('axios');
const https = require('https');

exports.handler = async function (event, context) {
  try {
    // Variables de entorno para autenticación y configuración de la API
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;
    const endpoint = process.env.API_ENDPOINT;

    // Verifica que las variables de entorno necesarias estén presentes
    if (!apiKey || !apiSecret || !endpoint) {
      console.error('Faltan las variables de entorno necesarias.');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Configuración del servidor incorrecta.' }),
      };
    }

    // Leer parámetros de búsqueda de la URL si están disponibles
    const { search } = event.queryStringParameters || {};
    let url = `${endpoint}?consumer_key=${apiKey}&consumer_secret=${apiSecret}`;
    
    // Añadir parámetro de búsqueda a la URL si fue provisto en la solicitud
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    console.log("Solicitando a la URL:", url);

    // Configura un agente HTTPS para ignorar errores de verificación SSL
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false, // Ignora la verificación SSL
    });

    // Realizar la solicitud GET a la API utilizando axios
    const response = await axios.get(url, {
      headers: { 'Content-Type': 'application/json' },
      httpsAgent, // Incluir el httpsAgent en la solicitud para omitir la verificación SSL
      timeout: 10000, // Opcional: Tiempo de espera de 10 segundos
    });

    // Responde con los datos obtenidos de la API, incluyendo configuración CORS
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    // Log de error para el seguimiento en caso de que ocurra un problema
    console.error('Error al obtener los productos:', error.message);

    // Determina el mensaje de error basado en el tipo de error
    let errorMessage = 'Error al obtener los productos.';
    if (error.response) {
      errorMessage = `Error de la API: ${error.response.status} ${error.response.statusText} - ${error.response.data}`;
    } else if (error.request) {
      errorMessage = 'No se recibió respuesta del servidor de la API.';
    } else {
      errorMessage = 'Error al configurar la solicitud a la API.';
    }

    // Responde con el mensaje de error y configura CORS
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};
