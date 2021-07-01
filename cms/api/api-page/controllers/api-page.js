'use strict';

const marked = require('marked');


/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const pages = await strapi.services['api-page'].find(ctx.query);
    for (const page of pages) {
      for (const content of page.content) {
        if (content.__component === 'content.markdown') {
          content.bodyRendered = marked(content.body);
        }
      }
    }
    return pages;
  },
};
