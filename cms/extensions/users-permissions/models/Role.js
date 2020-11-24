'use strict';

/**
 * Lifecycle callbacks for the `Role` model.
 */

const auditChange = (model, attrs) => strapi.log.info(`Role change: ${JSON.stringify(model)}, ${JSON.stringify(attrs)}`);
const auditDelete = (where) => strapi.log.info(`Role delete: ${JSON.stringify(where)}`);

module.exports = {
  lifecycle: {
    beforeCreate: auditChange,
    beforeUpdate: auditChange,
    beforeSave: auditChange,
    beforeDelete: auditDelete,
  },
};
