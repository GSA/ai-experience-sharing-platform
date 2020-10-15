const fs = require('fs').promises;
const path = require('path');

module.exports = strapi => {
  return {
    initialize() {
      const { path: publicPath } = strapi.config.middleware.settings.public;
      const staticDir = path.resolve(strapi.dir, publicPath || strapi.config.paths.static);

      strapi.app.use(async (ctx, next) => {
        await next();
        if (ctx.status === 404) {
          const spaIndex = await fs.readFile(path.join(staticDir, 'index.html'));
          ctx.status = 200;
          ctx.type = 'text/html; charset=utf-8';
          ctx.send(spaIndex);
        }
      });
    },
  };
};
