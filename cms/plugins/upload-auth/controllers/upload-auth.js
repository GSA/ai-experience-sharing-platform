'use strict';

/**
 * upload-auth.js controller
 *
 * @description: A set of functions called "actions" of the `upload-auth` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    const s3 = strapi.plugins['upload-auth'].provider;
    const bucket = strapi.plugins['upload-auth'].config.providerOptions.params.Bucket;
    const publicAssetMatcher = /^((large|medium|small|thumbnail)_)?public_.+/i;
    const requestedFile = ctx.captures[0];

    const mediaToken = ctx.cookies.get('media_auth');
    const isTokenValid = await strapi.plugins['users-permissions'].services.jwt.verify(mediaToken);
    
    if ((ctx.isAuthenticated && ctx.isAuthenticated()) || publicAssetMatcher.test(requestedFile) || isTokenValid) {
      const data = await s3.getObject({
        Bucket: bucket,
        Key: requestedFile,
      }).promise();

      ctx.type = data.ContentType;
      return ctx.send(data.Body);
    } else {
      ctx.status = 404;
      return;
    }
  }
};