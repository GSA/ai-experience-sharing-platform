'use strict';
/**
 * Upload auth plugin bootstrap.
 *
 * It initializes the provider and sets the default settings in db.
 */

const AWS = require('aws-sdk');

module.exports = async () => {
  strapi.plugins['upload-auth'].provider = new AWS.S3({
    apiVersion: '2006-03-01',
    ...strapi.plugins['upload-auth'].config.providerOptions,
  });
};
