const _ = require('lodash');

const disableAdminPasswords = async () => {
  const disableAdminPassword = (callback, id, attrs) => {
    if (attrs && attrs.password) {
      attrs.password = null;
    }
    strapi.log.info(`Admin user change: ${_.pick(attrs, ['id', 'username', 'email'])}`);
    return callback(id, attrs);
  };
  const auditAdminDelete = async (callback, where) => {
    strapi.log.info(`Admin user delete: ${JSON.stringify(where)}`);
    return callback(where);
  };

  if (!strapi.admin.models.user.lifecycles)
    strapi.admin.models.user.lifecycles = {};

  const beforeSaveCallback = strapi.admin.models.user.lifecycles.beforeSave || _.noop;
  const beforeUpdateCallback = strapi.admin.models.user.lifecycles.beforeUpdate || _.noop;
  const beforeDeleteCallback = strapi.admin.models.user.lifecycles.beforeDelete || _.noop;
  strapi.admin.models.user.lifecycles.beforeSave = _.wrap(beforeSaveCallback, disableAdminPassword);
  strapi.admin.models.user.lifecycles.beforeUpdate = _.wrap(beforeUpdateCallback, disableAdminPassword);
  strapi.admin.models.user.lifecycles.beforeDelete = _.wrap(beforeDeleteCallback, auditAdminDelete);
};

module.exports = { disableAdminPasswords };
