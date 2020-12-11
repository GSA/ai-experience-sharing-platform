const setupProviders = async () => {
  if (process.env.NODE_ENV !== 'test') {
    const providers = await strapi
          .store({
            environment: '',
            type: 'plugin',
            name: 'users-permissions',
            key: 'grant',
          })
          .get();

    for (const provider in providers) {
      if (provider === 'email') {
        providers[provider].enabled = false;
      }
    }

    await strapi
      .store({
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
        key: 'grant',
      })
      .set({ value: providers });
  }
};

module.exports = { setupProviders };
