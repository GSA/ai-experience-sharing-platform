'use strict';
const _ = require('lodash');

/**
 * Lifecycle callbacks for the `User` model.
 */

const auditChange = (id, attrs) => strapi.log.info(`User change: ${_.pick(attrs, ['id', 'username', 'email'])}`);
const auditCreate = (attrs) => strapi.log.info(`User create: ${_.pick(attrs, ['id', 'username', 'email'])}`);
const auditDelete = (where) => strapi.log.info(`User delete: ${JSON.stringify(where)}`);

module.exports = {
  lifecycles: {
    beforeUpdate: auditChange,
    beforeSave: auditChange,
    beforeCreate: auditCreate,
    beforeDelete: auditDelete,
  },
};
