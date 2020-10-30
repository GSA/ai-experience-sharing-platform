'use strict';

/**
 * upload-auth.js controller
 *
 * @description: A set of functions called "actions" of the `upload-auth` plugin.
 */

const STREAM_EXPIRES = 30 * 60;

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
    const streamableContentMatcher = /\.(mp3|mp4|mov)(\?.*)?$/i;
    const requestedFile = ctx.captures[0];

    const mediaToken = ctx.cookies.get('media_auth');
    const mediaTokenAdmin = ctx.cookies.get('media_auth_admin');

    let isTokenValid = false;
    try {
      if (mediaToken) {
        isTokenValid = await strapi.plugins['users-permissions'].services.jwt.verify(mediaToken);
      }
    } catch (err) {}
    if (!isTokenValid && mediaTokenAdmin) {
      isTokenValid = strapi.admin.services.token.decodeJwtToken(mediaTokenAdmin).isValid
    }

    if ((ctx.isAuthenticated && ctx.isAuthenticated()) || publicAssetMatcher.test(requestedFile) || isTokenValid) {
      const options = {
	Bucket: bucket,
        Key: requestedFile,
      };

      if (streamableContentMatcher.test(requestedFile)) {
        const surl = await s3.getSignedUrlPromise('getObject', {
          Expires: STREAM_EXPIRES,
          ...options
        });
        ctx.redirect(surl);
      } else {
        const data = await s3.getObject(options).promise();
        ctx.type = data.ContentType;
        ctx.response.length = data.ContentLength;
        return ctx.send(data.Body);
      }
    } else {
      ctx.status = 404;
      return;
    }
  },

  logout: async (ctx) => {
    if (ctx.cookies.get('media_auth')) {
      ctx.cookies.set('media_auth');
    }
    if (ctx.cookies.get('media_auth_admin')) {
      ctx.cookies.set('media_auth_admin');
    }
    ctx.send({});
  },
};
