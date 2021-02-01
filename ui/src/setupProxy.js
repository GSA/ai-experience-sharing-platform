const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  const strapiDevUrl = "http://localhost:1337";
  const strapiRoutes = [
    "admin",
    "auth",
    "connect",
    "content-manager",
    "users-permissions",
    "api-settings",
    "api-menus",
    "api-pages",
    "api-boks",
    "api-usecase-settings",
    "api-usecases/filters/all",
    "api-usecases",
    "upload-auth",
    "logingov-admin",
  ];
  for (const route of strapiRoutes) {
    app.use(
      `/${route}`,
      createProxyMiddleware({
        target: strapiDevUrl,
        changeOrigin: true,
      })
    );
  }
};
