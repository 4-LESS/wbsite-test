const axios = require('axios');
const https = require('https'); // Importar el módulo https

exports.handler = async function (event, context) {
  try {
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;
    const endpoint = process.env.API_ENDPOINT; // 'https://admin-farmahorro.freesite.online/wp-json/wc/v3/products'

    if (!apiKey || !apiSecret || !endpoint) {
      console.error('Faltan las variables de entorno necesarias.');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Configuración del servidor incorrecta.' }),
      };
    }

    // Obtener parámetros de búsqueda si existen
    const { search } = event.queryStringParameters || {};
    let url = `${endpoint}?consumer_key=${apiKey}&consumer_secret=${apiSecret}`;

    if (search) {
      // Suponiendo que la API de WooCommerce soporta el parámetro 'search'
      url += `&search=${encodeURIComponent(search)}`;
    }

    console.log("Solicitando a la URL:", url);

    // Crear un agente HTTPS que ignore la verificación SSL
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false, // Ignorar la verificación SSL
    });

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      httpsAgent, // Añadir el agente HTTPS personalizado
      timeout: 10000, // Opcional: Añadir un timeout de 10 segundos
    });

    console.log("Respuesta de la API:", response.data);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Configurar CORS según tus necesidades
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);

    // Determinar el tipo de error
    let errorMessage = 'Error al obtener los productos. Por favor, intenta nuevamente más tarde.';
    if (error.response) {
      // La solicitud se realizó y el servidor respondió con un estado diferente de 2xx
      errorMessage = `Error de la API: ${error.response.status} ${error.response.statusText}`;
    } else if (error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      errorMessage = 'No se recibió respuesta del servidor de la API.';
    } else {
      // Algo sucedió al configurar la solicitud
      errorMessage = 'Error al configurar la solicitud a la API.';
    }

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Configurar CORS según tus necesidades
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};

