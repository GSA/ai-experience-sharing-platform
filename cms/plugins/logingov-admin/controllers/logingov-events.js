'use strict';

const _ = require('lodash');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const unparsed = require('koa-body/unparsed.js');
const buddy = require('co-body');
const Cache = require('ttl');

/**
 * logingov-events.js controller
 *
 * @description: A set of functions called "actions" of the `logingov-admin` plugin.
 */

const userDeactivateEvent = "https://schemas.openid.net/secevent/risc/event-type/identifier-recycled";

let cache;
const getCache = () => {
  if (cache)
    return cache;
  return cache = new Cache({ttl: 10 * 60 * 1000});
};

const getLogingovConfig = async () => {
  const cache = getCache();
  if (cache.get('logingovConfig'))
    return cache.get('logingovConfig');
  const logingovConfig = await axios.get(`${strapi.plugins['logingov-admin'].discoveryUrl}/.well-known/risc-configuration`);
  cache.put('logingovConfig', logingovConfig);
  return logingovConfig;
};

const getCertConfigs = async (logingovConfig) => {
  const cache = getCache();
  if (cache.get('certConfigs'))
    return cache.get('certConfigs');
  const certsConfigs = await axios.get(logingovConfig.data.jwks_uri);
  cache.put('certsConfigs', certsConfigs);
  return certsConfigs;
};

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    if (strapi.plugins['logingov-admin'].discoveryUrl) {
      const rawBody = await buddy.text(ctx.request);
      const body = (rawBody && rawBody.length) ? rawBody.trim() : null;
      if (!body) {
        ctx.status = 400;
        return ctx.send({});
      }

      const logingovConfig = await getLogingovConfig();
      const certsConfigs = await getCertConfigs(logingovConfig);
      const certConfig = certsConfigs.data && certsConfigs.data.keys ? certsConfigs.data.keys[0] : null;
      if (!certConfig) {
        ctx.status = 400;
        return ctx.send({});
      }

      try {
        const token = await new Promise((resolve, reject) => {
          jwt.verify(body, certConfig.n, {
            algorithms: [certConfig.kty],
          }, (err, payload) => {
            if (err)
              return reject(err);
            return resolve(payload);
          })
        });
      } catch (e) {
        strapi.log.error('Logingov event JWT decode failure', e);
        ctx.status = 400;
        return ctx.send({});
      }

      if (token && token.events && token.events[userDeactivateEvent]) {
        const knex = strapi.connections.default;
        await knex('users-permissions_user')
          .whereIn('usename', token.events[userDeactivateEvent].subject.email)
          .update({blocked: true})
      }
      ctx.send({});
    } else {
      strapi.log.error("strapi.plugins['logingov-admin'].discoveryUrl is not configured");
      ctx.status = 501;
      ctx.send({});
    }
  },
};
