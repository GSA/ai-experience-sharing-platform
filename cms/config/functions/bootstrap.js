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
