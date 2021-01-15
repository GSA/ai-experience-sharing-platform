const getServiceConfig = require('../cloud-foundry-data').getServiceConfig;

const setupJwtSecret = async () => {
  const serviceConfig = getServiceConfig();
  const userProvidedServices = serviceConfig['user-provided'] || [];
  const cmsService = userProvidedServices.filter(service => service.name === 'cms-service');
  const jwtSecret = cmsService.length > 0 ? cmsService[0].credentials.jwtSecret : "gC2]#>*ol:P;3m3Z|C(R?Z4w}f9/_)np";
  strapi.plugins['users-permissions'].config.jwtSecret = jwtSecret;
};

module.exports = {setupJwtSecret};
