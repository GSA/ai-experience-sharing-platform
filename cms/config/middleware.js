const getServiceConfig = require('./cloud-foundry-data').getServiceConfig;

module.exports = ({ env }) => {
  const serviceConfig = getServiceConfig();
  const userProvidedServices = serviceConfig['user-provided'] || [];
  const cmsService = userProvidedServices.filter(service => service.name === 'cms-service');
  const sessionSecret1 = cmsService.length > 0 ? cmsService[0].credentials.sessionSecret1 : "Xp!My._a*Tzz(s/<X5}>w[wb!:k@KjF^";
  const sessionSecret2 = cmsService.length > 0 ? cmsService[0].credentials.sessionSecret2 : "@0cL.8V%#vhVOor[nF8t7v%[kzI-00BN";

  return {
    load: {
      after: ['spa', 'authCookie', 'parser', 'router'],
    },
    settings: {
      spa: {
        enabled: true,
      },
      authCookie: {
        enabled: true,
      },
      poweredBy: {
        enabled: false,
      },
      session: {
        enabled: true,
        client: serviceConfig.isLocal ? "sqlite" : "postgresql",
        connection: serviceConfig.isLocal ? "default" : "pg",
        key: "strapi.sid",
        prefix: "strapi:sess:",
        ttl: 12 * 60 * 60 * 1000,
        rolling: false,
        secretKeys: [env("SESSION_SECRET_1", sessionSecret1), env("SESSION_SECRET_2", sessionSecret2)],
        cookie: {
          path: "/",
          httpOnly: true,
          maxAge: 12 * 60 * 60 * 1000,
          rewrite: true,
          signed: false
        },
      },
    },
  };
}
