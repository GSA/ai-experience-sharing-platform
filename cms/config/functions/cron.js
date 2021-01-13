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
  // '*/15 * * * *': async () => {
  //   await strapi.query('user', 'admin').update({}, {password: null});
  // },
  // '25 2 * * *': async () => {
  //   const usersToDeactivate = await strapi.query('logingovuser', 'logingov-admin').find({lastlogin_lt: new Date(new Date() - 90 * 24 * 60 * 60 * 1000)});
  //   const userIdsToDeactivate = usersToDeactivate.map(u => u.id);
  //   const knex = strapi.connections.default;
  //   for (const chunk of _.chunk(userIdsToDeactivate, 100)) {
  //     await knex('users-permissions_user')
  //       .whereIn('id', chunk)
  //       .update({blocked: true})
  //   }
  // },
};
