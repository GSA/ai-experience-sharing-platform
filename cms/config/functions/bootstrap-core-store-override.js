const getServiceConfig = require('../cloud-foundry-data').getServiceConfig;

const serviceConfig = getServiceConfig();
const userProvidedServices = serviceConfig['user-provided'] || [];
const loginGov = userProvidedServices.filter(service => service.name === 'login-gov');
const loginGovCredentials = loginGov.length > 0 ? loginGov[0].credentials : {};


const setupCoreStoreOverride = async () => {
  const origStore = strapi.store;
  strapi.store = (source = {}) => {
    async function get(params = {}) {
      const results = await origStore(source).get(params);
      if (
        (source.type === 'plugin' || params.type === 'plugin') &&
          (source.name === 'users-permissions' || params.name === 'users-permissions') &&
          (source.key === 'grant' || params.key === 'grant')) {
        results.logingov.private_key = results.logingov.private_key ? results.logingov.private_key : loginGovCredentials['privateKey'];
        results.logingov.public_key = results.logingov.public_key ? results.logingov.public_key : loginGovCredentials['certificate'];
      }
      return results;
    };
    async function set() {
      return await origStore(source).set.apply(origStore, arguments);
    };
    return {get, set};
  };
};

module.exports = { setupCoreStoreOverride };
