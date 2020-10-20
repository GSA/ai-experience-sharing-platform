const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  const strapiDev = 'http://localhost:1337';
  const strapiRoutes = ['connect', 'admin', 'content-manager', 'users-permissions'];
  for (const route of strapiRoutes) {
    app.use(
      `/${route}`,
      createProxyMiddleware({
        target: strapiDev,
        changeOrigin: true,
      })
    );
  }
};
