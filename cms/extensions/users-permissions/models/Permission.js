'use strict';

/**
 * Lifecycle callbacks for the `Permission` model.
 */

const auditChange = (model, attrs) => strapi.log.info(`Permission change: ${JSON.stringify(model)}, ${JSON.stringify(attrs)}`);
const auditDelete = (where) => strapi.log.info(`Permission delete: ${JSON.stringify(where)}`);

module.exports = {
  lifecycles: {
    beforeCreate: auditChange,
    beforeUpdate: auditChange,
    beforeSave: auditChange,
    beforeDelete: auditChange,
  },
};
