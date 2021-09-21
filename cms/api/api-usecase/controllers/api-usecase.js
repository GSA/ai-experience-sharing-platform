'use strict';
const _ = require('lodash');
const LRU = require("lru-cache");
const { sanitizeEntity } = require('strapi-utils');

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
      agencies = this.cache.get('agencies');
    } else {
      agencies = await strapi.connections[connDefault]('Usecase').distinct('metadataAgency').orderBy('metadataAgency');
      this.cache.set('agencies', agencies);
    }

    const selectedFilters = _.pick(strapi.models["api-usecase"].attributes, strapi.config.useCases.filters);
    for (const filterName in selectedFilters) {
      const filter = selectedFilters[filterName];
      if (filter.isVirtual) {
        if (this.cache.get(filterName)) {
          filter.enum = this.cache.get(filterName);
        } else {
          const filterValues = await strapi.models[filter.collection].fetchAll();
          const enums = filterValues.models.map((filterValue) => {return filterValue.attributes.metadata});
          this.cache.set(filterName, enums);
          filter.enum = enums;
        }
      }
    }
    return ctx.send({
      filters: _.extend(
        {},
        selectedFilters,
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
          .where('components_content_markdowns.body', 'ilike', `%${query.q}%`) // Escaped per https://github.com/knex/documentation/issues/73#issuecomment-572482153
          .select('Usecase_components.Usecase_id');
    const search = {
      _limit: Math.min(query._limit, 100) || 10,
      id_in: ids.map((id) => id.Usecase_id),
      _where: [],
    };
    if (query._sort)
      search._sort = query._sort;
    Object.keys(query).filter(p => !p.startsWith('_') && p !== 'q').forEach((p) => {
      search._where.push({ [p]: query[p] });
    });
    search._where.push({ 'published_at_null': false });
    const results = await strapi.query('api-usecase').find(search);
    return ctx.send(results.map(entity => sanitizeEntity(entity, { model: strapi.models["api-usecase"] })));
  },
};
