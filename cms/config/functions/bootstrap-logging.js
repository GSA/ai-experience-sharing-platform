const pino = require('pino');

const setupLogging = async () => {
  const loggerConfig = {
    level: 'debug',
    forceColor: true,
    mixin () {
      if (strapi.app && strapi.app.context && strapi.app.context.asyncLocalStorage) {
        const store = strapi.app.context.asyncLocalStorage.getStore();
        return store || {};
      } else {
        return {};
      }
    },
  };
  strapi.log = pino(loggerConfig);
};

module.exports = { setupLogging };
