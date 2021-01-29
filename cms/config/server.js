const getServiceConfig = require('./cloud-foundry-data').getServiceConfig;

module.exports = ({ env }) => {
  const serviceConfig = getServiceConfig();
  const userProvidedServices = serviceConfig['user-provided'] || [];
  const cmsService = userProvidedServices.filter(service => service.name === 'cms-service');
  const adminJwtSecret = cmsService.length > 0 ? cmsService[0].credentials.adminJwtSecret : "w7+95a6sh#Ls%Tq[@H:)4.MslJCu0Q4$";

  return {
    cron: {
      enabled: true,
    },
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    admin: {
      auth: {
        secret: env('ADMIN_JWT_SECRET', adminJwtSecret),
      },
    },
    url: env('CMSURL', ''),
  };
};
