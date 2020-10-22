const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  const strapiDev = 'http://localhost:1337';
  const strapiRoutes = ['connect', 'admin', 'auth', 'content-manager', 'users-permissions', 'api-settings', 'api-menus', 'api-pages', 'api-usecases'];
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
