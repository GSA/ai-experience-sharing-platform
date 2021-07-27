"use strict";
const _ = require("lodash");

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
  '*/15 * * * *': async () => {
    if (strapi.config.database.defaultConnection === 'default') {
      return;
    }
    await strapi.query('user', 'admin').update({}, {password: null});
  },
  '25 2 * * *': async () => {
    if (strapi.config.database.defaultConnection === 'default') {
      return;
    }
    const usersToDeactivate = await strapi.query('logingovuser', 'logingov-admin').find({lastlogin_lt: new Date(new Date() - 90 * 24 * 60 * 60 * 1000)});
    const userIdsToDeactivate = usersToDeactivate.map(u => u.id);
    const knex = strapi.connections.default;
    for (const chunk of _.chunk(userIdsToDeactivate, 100)) {
      await knex('users-permissions_user')
        .whereIn('id', chunk)
        .update({blocked: true})
    }
  },
  '33 * * * *': async () => {
    const counts = {};
    for (const filter of strapi.config.useCases.filters) {
      counts[filter] = counts[filter] || {};
      if (strapi.models['api-usecase'].attributes[filter].isVirtual) {
        const filterOptions = await strapi.models[strapi.models['api-usecase'].attributes[filter].collection].fetchAll();
        for (const filterOption of (filterOptions.models || [])) {
          counts[filter][filterOption.attributes.metadata] = await strapi.services['api-usecase'].count({
            [`${filter}.metadata`]: filterOption.attributes.metadata,
          });
        }
      } else {
        for (const filterOption of (strapi.models['api-usecase'].attributes[filter]['enum'] || [])) {
          counts[filter][filterOption] = await strapi.services['api-usecase'].count({
            [filter]: filterOption,
          });
        }
      }
    }

    const settings = await strapi.services['api-usecase-settings'].find() || {};
    settings.usecaseFilterCounts = counts;
    await strapi.services['api-usecase-settings'].createOrUpdate(settings);
  },
  '0 */1 * * *': () => {
    strapi.plugins.sitemap.services.sitemap.createSitemap();
  },
};
