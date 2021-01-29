'use strict';
const { env } = require('strapi-utils');

/**
 * Logingov-admin plugin bootstrap.
 *
 * It initializes the provider and sets the default settings in db.
 */

module.exports = async () => {
  strapi.plugins['logingov-admin'].discoveryUrl = env('LOGINGOV_DISCO_URL', '');
};
