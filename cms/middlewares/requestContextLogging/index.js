const _ = require('lodash');

module.exports = strapi => {
  return {
    initialize() {
      _.forEach(strapi.admin.config.routes, value => {
        if (_.get(value.config, 'policies')) {
          value.config.policies.push('global::requestContextLogger');
        }
      });

      _.forEach(strapi.config.routes, value => {
        if (_.get(value.config, 'policies')) {
          value.config.policies.push('global::requestContextLogger');
        }
      });

      if (strapi.plugins) {
        _.forEach(strapi.plugins, plugin => {
          _.forEach(plugin.config.routes, value => {
            if (_.get(value.config, 'policies')) {
              value.config.policies.push('global::requestContextLogger');
            }
          });
        });
      }
    },
  };
};
                    
