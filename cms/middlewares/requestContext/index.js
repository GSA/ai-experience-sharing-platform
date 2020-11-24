const { AsyncLocalStorage } = require('async_hooks');

module.exports = strapi => {
  return {
    initialize() {
      const asyncLocalStorage = new AsyncLocalStorage();
      strapi.app.context.asyncLocalStorage = asyncLocalStorage;
      strapi.app.use(async (ctx, next) => {
        const store = {};

        return new Promise((resolve, reject) => {
          asyncLocalStorage.run(store, async () => {
            await next();
            return resolve();
          });
        });
      });
    },
  };
};
