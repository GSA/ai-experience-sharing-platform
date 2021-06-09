const strapi = require('strapi');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.PORT || 8080;
const strapiPort = (parseInt(port, 10) + 1).toString();

const app = express();
const strapiProxy = createProxyMiddleware({ target: `http://localhost:${strapiPort}` });

const strapiRoutes = [
  "admin",
  "auth",
  "connect",
  "content-manager",
  "content-type-builder",
  "users-permissions",
  "_health",
  "api",
  "upload-auth",
  "upload",
  "logingov-admin",
];
for (const route of strapiRoutes) {
  app.use(`/${route}*`, strapiProxy);
}
app.use(express.static('public'));
app.use('*', strapiProxy);
app.listen(port);

process.env.PORT = strapiPort;
strapi().start();
