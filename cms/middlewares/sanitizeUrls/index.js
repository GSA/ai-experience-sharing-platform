module.exports = strapi => {
  return {
    initialize() {
      const blockList = /[%\(\)]/;
      strapi.app.use(async (ctx, next) => {
        if (blockList.test(ctx.request.path)) {
          ctx.throw(400, 'Bad request')
        }
        await next();
      });
    }
  };
};
