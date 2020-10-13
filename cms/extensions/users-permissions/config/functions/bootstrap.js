'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const uuid = require('uuid/v4');

const usersPermissionsActions = require('../../../../node_modules/strapi-plugin-users-permissions/config/users-permissions-actions');

const userProvidedServices = process.env.VCAP_SERVICES['user-provided'] || [];
const loginGov = userProvidedServices.filter(service => service.name === 'login-gov');
const loginGovCredentials = loginGov.length > 0 ? loginGov[0].credentials : {};


module.exports = async () => {
  const pluginStore = strapi.store({
    environment: '',
    type: 'plugin',
    name: 'users-permissions',
  });

  const grantConfig = {
    email: {
      enabled: true,
      icon: 'envelope',
    },
    discord: {
      enabled: false,
      icon: 'discord',
      key: '',
      secret: '',
      callback: `${strapi.config.server.url}/auth/discord/callback`,
      scope: ['identify', 'email'],
    },
    localuaa: {
      enabled: true,
      icon: 'discord',
      key: '',
      secret: '',
      callback: `${strapi.config.server.url}/auth/localuaa/callback`,
      scope: ['identify', 'email'],
      oauth: 2,
      access_url: 'http://localhost:8080/oauth/token',
    },
    logingov: {
      enabled: true,
      icon: 'discord',
      key: loginGovCredentials['issuer'],
      secret: loginGovCredentials['issuer'],  // Not used but makes the strapi admin ui happy
      callback: `${strapi.config.server.url}/auth/logingov/callback`,
      scope: ['identify', 'email'],
      oauth: 2,
      access_url: 'https://idp.int.identitysandbox.gov/api/openid_connect/token',
      token_endpoint_auth_method: 'private_key_jwt',
      public_key: loginGovCredentials['certificate'],
      private_key: loginGovCredentials['privateKey'],
      state: 'E74D92C3-356C-4A1B-B443-7FE6E21A7BC73A8B5978-3ADD-48FC-AC1D-6958651CAB74',
      nonce: '5F962C9F-3FEF-4990-B0B3-E7CE60A1054E9366D3E9-D3F7-4B91-86B4-E50A1A9C1713',
      custom_params: {
        acr_values: 'http://idmanagement.gov/ns/assurance/ial/1',
      },
    },
    facebook: {
      enabled: false,
      icon: 'facebook-square',
      key: '',
      secret: '',
      callback: `${strapi.config.server.url}/auth/facebook/callback`,
      scope: ['email'],
    },
    google: {
      enabled: false,
      icon: 'google',
      key: '',
      secret: '',
      callback: `${strapi.config.server.url}/auth/google/callback`,
      scope: ['email'],
    },
    github: {
      enabled: false,
      icon: 'github',
      key: '',
      secret: '',
      callback: `${strapi.config.server.url}/auth/github/callback`,
      scope: ['user', 'user:email'],
    },
    microsoft: {
      enabled: false,
      icon: 'windows',
      key: '',
      secret: '',
      callback: `${strapi.config.server.url}/auth/microsoft/callback`,
      scope: ['user.read'],
    },
    twitter: {
      enabled: false,
      icon: 'twitter',
      key: '',
      secret: '',
      callback: `${strapi.config.server.url}/auth/twitter/callback`,
    },
    instagram: {
      enabled: false,
      icon: 'instagram',
      key: '',
      secret: '',
      callback: `${strapi.config.server.url}/auth/instagram/callback`,
    },
    vk: {
      enabled: false,
      icon: 'vk',
      key: '',
      secret: '',
      callback: `${strapi.config.server.url}/auth/vk/callback`,
      scope: ['email'],
    },
    twitch: {
      enabled: false,
      icon: 'twitch',
      key: '',
      secret: '',
      callback: `${strapi.config.server.url}/auth/twitch/callback`,
      scope: ['user:read:email'],
    },
  };
  const prevGrantConfig = (await pluginStore.get({ key: 'grant' })) || {};
  // store grant auth config to db
  // when plugin_users-permissions_grant is not existed in db
  // or we have added/deleted provider here.
  if (!prevGrantConfig || !_.isEqual(_.keys(prevGrantConfig), _.keys(grantConfig))) {
    // merge with the previous provider config.
    _.keys(grantConfig).forEach(key => {
      if (key in prevGrantConfig) {
        grantConfig[key] = _.merge(grantConfig[key], prevGrantConfig[key]);
      }
    });
    await pluginStore.set({ key: 'grant', value: grantConfig });
  }

  if (!(await pluginStore.get({ key: 'email' }))) {
    const value = {
      reset_password: {
        display: 'Email.template.reset_password',
        icon: 'sync',
        options: {
          from: {
            name: 'Administration Panel',
            email: 'no-reply@strapi.io',
          },
          response_email: '',
          object: 'Reset password',
          message: `<p>We heard that you lost your password. Sorry about that!</p>

<p>But don’t worry! You can use the following link to reset your password:</p>
<p><%= URL %>?code=<%= TOKEN %></p>

<p>Thanks.</p>`,
        },
      },
      email_confirmation: {
        display: 'Email.template.email_confirmation',
        icon: 'check-square',
        options: {
          from: {
            name: 'Administration Panel',
            email: 'no-reply@strapi.io',
          },
          response_email: '',
          object: 'Account confirmation',
          message: `<p>Thank you for registering!</p>

<p>You have to confirm your email address. Please click on the link below.</p>

<p><%= URL %>?confirmation=<%= CODE %></p>

<p>Thanks.</p>`,
        },
      },
    };

    await pluginStore.set({ key: 'email', value });
  }

  if (!(await pluginStore.get({ key: 'advanced' }))) {
    const value = {
      unique_email: true,
      allow_register: true,
      email_confirmation: false,
      email_reset_password: null,
      email_confirmation_redirection: null,
      default_role: 'authenticated',
    };

    await pluginStore.set({ key: 'advanced', value });
  }

  await strapi.plugins['users-permissions'].services.userspermissions.initialize();

  if (!_.get(strapi.plugins['users-permissions'], 'config.jwtSecret')) {
    const jwtSecret = uuid();
    _.set(strapi.plugins['users-permissions'], 'config.jwtSecret', jwtSecret);

    strapi.reload.isWatching = false;

    await strapi.fs.writePluginFile(
      'users-permissions',
      'config/jwt.js',
      `module.exports = {\n  jwtSecret: process.env.JWT_SECRET || '${jwtSecret}'\n};`
    );

    strapi.reload.isWatching = true;
  }

  const { actionProvider } = strapi.admin.services.permission;
  actionProvider.register(usersPermissionsActions.actions);
};
