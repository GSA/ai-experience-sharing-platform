'use strict';
const _ = require('lodash');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async filters(ctx) {
    return ctx.send({
      filters: _.pick(strapi.models["api-usecase"].attributes, strapi.config.useCases.filters),
    });
  },
};
