const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  const strapiDev = 'http://localhost:1337';
  app.use(
    '/connect',
    createProxyMiddleware({
      target: strapiDev,
      changeOrigin: true,
    })
  );
};
