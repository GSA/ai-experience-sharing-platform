'use strict';

const _ = require('lodash');

/**
 * logingov-admin.js controller
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

    const email = ctx.state && ctx.state.user ? ctx.state.user.email : null;

    if (email) {
      const admin = await strapi.query('user', 'admin').findOne({ email }, ['roles']);

      if (admin && admin.isActive) {
        ctx.state.admin = admin;
        ctx.state.user = admin;
        ctx.state.userAbility = await strapi.admin.services.permission.engine.generateUserAbility(
          admin
        );
        ctx.state.isAuthenticatedAdmin = true;

        strapi.log.info(`Admin login ${JSON.stringify(_.pick(admin, ['id', 'username', 'email', 'roles']))}`);

        ctx.send({
          token: strapi.admin.services.token.createJwtToken({ id: admin.id }),
          user: strapi.admin.services.user.sanitizeUser(ctx.state.user),
        });
      } else {
        return ctx.forbidden('Invalid credentials');
      }
    } else {
      return ctx.forbidden('Invalid credentials');
    }
  }
};
