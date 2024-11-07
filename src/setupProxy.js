// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://admin-farmahorro.freesite.online',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/wp-json/wc/v3/products',
      },
      secure: false, // Ignorar la verificación SSL (solo para pruebas)
      onProxyReq: (proxyReq, req, res) => {
        const consumerKey = process.env.REACT_APP_WC_CONSUMER_KEY;
        const consumerSecret = process.env.REACT_APP_WC_CONSUMER_SECRET;

        if (consumerKey && consumerSecret) {
          const url = new URL(proxyReq.path, 'https://admin-farmahorro.freesite.online');
          url.searchParams.set('consumer_key', consumerKey);
          url.searchParams.set('consumer_secret', consumerSecret);
          proxyReq.path = url.pathname + url.search;
        }
      },
      // Opcional: Añadir un agente HTTPS personalizado si es necesario
      agent: new https.Agent({
        rejectUnauthorized: false, // Ignorar la verificación SSL
      }),
    })
  );
};
