'use strict';

const _ = require('lodash');

/**
 * logingov-refresh.js controller
 *
 * @description: A set of functions called "actions" of the `logingov-admin` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {

    const user = ctx.state && ctx.state.user ? ctx.state.user : null;

    if (user && !user.blocked && user.id) {
      ctx.send({
        token: strapi.plugins['users-permissions'].services.jwt.issue({
          id: user.id,
        }),
      });
    } else {
      return ctx.forbidden('Invalid credentials');
    }
  }
};
