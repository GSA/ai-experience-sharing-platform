'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports = async () => {
  const publicRoleId = 2;

  const plugins = await strapi.plugins['users-permissions'].services.userspermissions.getPlugins();
  const role = await strapi.plugins['users-permissions'].services.userspermissions.getRole(
    publicRoleId,
    plugins
  );

  const publicPermissions = {
    'api-menu': ['count', 'find', 'findone'],
    'api-page': ['count', 'find', 'findone'],
    'api-settings': ['find'],
    'api-usecase': ['count', 'find', 'findone'],
  };

  for (const controller in publicPermissions) {
    for (const action of publicPermissions[controller]) {
      role.permissions.application.controllers[controller][action].enabled = true;
    }
  }

  await strapi.plugins['users-permissions'].services.userspermissions.updateRole(
    publicRoleId,
    role
  );

};
