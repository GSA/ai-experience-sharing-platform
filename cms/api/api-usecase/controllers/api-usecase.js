'use strict';
const _ = require('lodash');
const LRU = require("lru-cache");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async filters(ctx) {
    if (!this.cache) {
      this.cache = new LRU({max: 10, maxAge: 60 * 60 * 1000})
    }
    const connDefault = strapi.config.database.defaultConnection;

    let agencies
    if (this.cache.get('agencies')) {
      agencies = this.cache.get('agencies')
    } else {
      agencies = await strapi.connections[connDefault]('Usecase').distinct('metadataAgency').orderBy('metadataAgency');
      this.cache.set('agencies', agencies)
    }

    return ctx.send({
      filters: _.extend({},
                        _.pick(strapi.models["api-usecase"].attributes, strapi.config.useCases.filters),
                        {metadataAgency: {type: "enumeration", "enum": agencies.map((a) => a.metadataAgency)}}
                       ),
    });
  },
  async search(ctx) {
    const query = ctx.query;
    if (!query.q || query.q.length < 3) {
      return ctx.send([]);
    }
    const connDefault = strapi.config.database.defaultConnection;
    const ids = await strapi.connections[connDefault]('Usecase_components')
          .innerJoin('components_content_markdowns', 'Usecase_components.component_id', 'components_content_markdowns.id')
          .where('components_content_markdowns.body', 'ilike', `%${query.q}%`)
          .select('Usecase_components.Usecase_id');
    const search = {
      _limit: query._limit || 10,
      id_in: ids.map((id) => id.Usecase_id),
    };
    if (query._sort)
      search._sort = query._sort;
    Object.keys(query).filter(p => !p.startsWith('_') && !p === 'q').forEach((p) => {
      search[p] = query[p];
    });
    const results = await strapi.query('api-usecase').find(search);
    return ctx.send(results);
  },
};
