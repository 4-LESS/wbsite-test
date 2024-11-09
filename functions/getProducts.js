/* Esta funcion no está siendo usada por conflictos en la API que
aun no se solucionan*/

const axios = require('axios');
const https = require('https');

exports.handler = async function (event, context) {
  try {
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;
    const endpoint = process.env.API_ENDPOINT;

    if (!apiKey || !apiSecret || !endpoint) {
      console.error('Faltan las variables de entorno necesarias.');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Configuración del servidor incorrecta.' }),
      };
    }

    // Leer parámetros de búsqueda de la URL
    const { search } = event.queryStringParameters || {};
    let url = `${endpoint}?consumer_key=${apiKey}&consumer_secret=${apiSecret}`;
    
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    console.log("Solicitando a la URL:", url);

    // Crear un https.Agent configurado para ignorar los errores SSL
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false, // Ignora la verificación SSL
    });

    // Realizar la solicitud a la API utilizando axios con el httpsAgent
    const response = await axios.get(url, {
      headers: { 'Content-Type': 'application/json' },
      httpsAgent, // Incluir el httpsAgent en la solicitud
      timeout: 10000, // Opcional: Tiempo de espera de 10 segundos
    });

    // Retornar la respuesta con los productos
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);

    // Determinar el mensaje de error basado en el tipo de error
    let errorMessage = 'Error al obtener los productos.';
    if (error.response) {
      errorMessage = `Error de la API: ${error.response.status} ${error.response.statusText} - ${error.response.data}`;
    } else if (error.request) {
      errorMessage = 'No se recibió respuesta del servidor de la API.';
    } else {
      errorMessage = 'Error al configurar la solicitud a la API.';
    }

    // Retornar el mensaje de error
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
