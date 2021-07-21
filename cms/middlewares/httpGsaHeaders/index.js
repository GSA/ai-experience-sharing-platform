const _ = require('lodash');

module.exports = strapi => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        ctx.set('Cache-Control', 'no-store, max-age=900');
        ctx.set('Pragma', 'no-cache');
        ctx.set('Permissions-Policy', "microphone=(), geolocation=(), accelerometer=(), camera=(), fullscreen=(), gyroscope=(), magnetometer=(), payment=()");
        await next();
        if (ctx.method === 'OPTIONS' && (ctx.url && ctx.url.startsWith('/api-'))) {
          const methods = (ctx.response.header.allow || '').split(', ');
          const sanitizedMethods = _.difference(methods, ['DELETE', 'PUT']);
          ctx.set('Allow', sanitizedMethods.join(', '));
        }
      });
    },
  };
};
