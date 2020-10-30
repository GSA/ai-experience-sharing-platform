
module.exports = strapi => {
  return {
    initialize() {
      const openIdConnectUrlMatcher = /^\/auth\/\w+\/callback/i;
      const adminUIMatcher = /^\/admin\/login/;
      const cookieMaxAge = 12 * 60 * 60 * 1000;

      strapi.app.use(async (ctx, next) => {
        await next();
        if (openIdConnectUrlMatcher.test(ctx.url) && ctx.body && ctx.body.jwt) {
          ctx.cookies.set('media_auth', ctx.body.jwt, {maxAge: cookieMaxAge});
        } else if (ctx.method === 'POST' && adminUIMatcher.test(ctx.url) && ctx.body && ctx.body.data && ctx.body.data.token) {
          ctx.cookies.set('media_auth_admin', ctx.body.data.token, {maxAge: cookieMaxAge});
        }
      });
    },
  };
};
