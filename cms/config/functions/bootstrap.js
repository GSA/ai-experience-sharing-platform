const getServiceConfig = require('../cloud-foundry-data').getServiceConfig;

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

const setupPublicPermissions = async () => {
  const publicRoleId = 2;
  const authenticatedRoleId = 1;

  const plugins = await strapi.plugins['users-permissions'].services.userspermissions.getPlugins();
  for (roleId of [publicRoleId, authenticatedRoleId]) {
    const role = await strapi.plugins['users-permissions'].services.userspermissions.getRole(
      roleId,
      plugins
    );

    const publicPermissions = {
      application: {
        'api-menu': ['count', 'find', 'findone'],
        'api-page': ['count', 'find', 'findone'],
        'api-settings': ['find'],
        'api-usecase': ['count', 'find', 'findone'],
      },
      'upload-auth': {
        'upload-auth': ['index', 'logout'],
      },
    };

    for (const plugin in publicPermissions) {
      for (const controller in publicPermissions[plugin]) {
        for (const action of publicPermissions[plugin][controller]) {
          role.permissions[plugin].controllers[controller][action].enabled = true;
        }
      }
    }

    await strapi.plugins['users-permissions'].services.userspermissions.updateRole(
      roleId,
      role
    );
  }
};

const setupJwtSecret = async () => {
  const serviceConfig = getServiceConfig();
  const userProvidedServices = serviceConfig['user-provided'] || [];
  const cmsService = userProvidedServices.filter(service => service.name === 'cms-service');
  const jwtSecret = cmsService.length > 0 ? cmsService[0].credentials.jwtSecret : "gC2]#>*ol:P;3m3Z|C(R?Z4w}f9/_)np";
  strapi.plugins['users-permissions'].config.jwtSecret = jwtSecret;
}

module.exports = async () => {
  await setupPublicPermissions();
  await setupJwtSecret();
};
