
module.exports = strapi => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        ctx.set('Permissions-Policy', "microphone=(), geolocation=(), accelerometer=(), camera=(), fullscreen=(), gyroscope=(), magnetometer=(), payment=()");
        return next();
      });
    },
  };
};
