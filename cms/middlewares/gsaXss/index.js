const _ = require('lodash');

module.exports = strapi => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        try {
          await next();
        } catch (err) {
          err.message = _.escape(err.message);
          throw err;
        }
      });
    },
  };
};
        
