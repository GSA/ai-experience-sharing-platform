const setupApiSettings = async () => {
  const setting = await strapi.query('api-settings').findOne();
  if (!setting) {
    await strapi.query('api-settings').create({title: 'Headless CMS Platform Beta', created_by: 1, updated_by: 1})
  }
};

module.exports = { setupApiSettings };
