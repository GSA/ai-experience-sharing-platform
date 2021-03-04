const { setupJwtSecret } = require('./bootstrap-secrets');
const { setupPermissions } = require('./bootstrap-permissions');
const { disableAdminPasswords } = require('./bootstrap-disable-passwords');
const { setupLogging } = require('./bootstrap-logging');
const { configureSignups } = require('./bootstrap-signups');
const { setupApiSettings } = require('./bootstrap-api-settings');
const { setupProviders } = require('./bootstrap-providers');
const { setupCoreStoreOverride } = require('./bootstrap-core-store-override');

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
  await setupLogging();
  await setupPermissions();
  await setupJwtSecret();
  await disableAdminPasswords();
  await configureSignups();
  await setupProviders();
  await setupCoreStoreOverride();
};
