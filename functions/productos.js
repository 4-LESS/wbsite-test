// functions/productos.js
const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    const response = await axios.get(`${'https://fakestoreapi.com'}/products`, {
      /*auth: {
        username: process.env.WC_CONSUMER_KEY,
        password: process.env.WC_CONSUMER_SECRET,
      },*/
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener los productos' }),
    };
  }
};
