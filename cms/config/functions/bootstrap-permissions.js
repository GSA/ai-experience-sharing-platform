const setupPermissions = async () => {
  const publicRoleId = 2;
  const authenticatedRoleId = 1;

  const plugins = await strapi.plugins['users-permissions'].services.userspermissions.getPlugins();
  for (roleId of [publicRoleId, authenticatedRoleId]) {
    const role = await strapi.plugins['users-permissions'].services.userspermissions.getRole(
      roleId,
      plugins
    );

    const publicPermissions = {
      application: {
        'api-menu': ['count', 'find', 'findone'],
        'api-page': ['count', 'find', 'findone'],
        'api-bok': ['count', 'find', 'findone'],
        'api-settings': ['find'],
      },
      'upload-auth': {
        'upload-auth': ['index', 'logout'],
      },
    };
    const authenticatedPermissions = {
      application: {
        'api-usecase': ['count', 'find', 'findone', 'filters'],
        'api-search-suggestion': ['count', 'find', 'findone'],
        'api-usecase-settings': ['find'],
      },
      'logingov-admin': {
        'logingov-admin': ['index'],
      },
    };

    const applyPermissions = (permissions) => {
      for (const plugin in permissions) {
        for (const controller in permissions[plugin]) {
          for (const action of permissions[plugin][controller]) {
            role.permissions[plugin].controllers[controller][action].enabled = true;
          }
        }
      }
    }
    applyPermissions(publicPermissions);
    if (roleId === authenticatedRoleId) {
      applyPermissions(authenticatedPermissions);
    }

    await strapi.plugins['users-permissions'].services.userspermissions.updateRole(
      roleId,
      role
    );
  }
};

module.exports = { setupPermissions };
