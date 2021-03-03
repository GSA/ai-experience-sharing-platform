const configureSignups = async () => {
  const advancedSettings = await strapi.store({
    environment: '',
    type: 'plugin',
    name: 'users-permissions',
    key: 'advanced',
  });
  advancedSettings.allow_register = true;
  await strapi
    .store({
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
      key: 'advanced',
    })
    .set({ value: advancedSettings })
};

module.exports = { configureSignups };
