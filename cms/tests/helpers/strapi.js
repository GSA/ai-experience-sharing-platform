const fs = require('fs').promises;
const path = require('path');
const Strapi = require('strapi');
const http = require('http');

let instance;

const fakeSpaIndex = '<html><head><title>Fake SPA Index</title></head><body></body></html>';

async function setupFakeSpaIndex() {
  const publicDir = path.join(__dirname, '../../public');
  try {
    await fs.mkdir(publicDir);
  } catch (err) {}
  try {
    await fs.writeFile(path.join(publicDir, 'index.html'), fakeSpaIndex, { flag: 'wx' })
  } catch (err) {}
};

async function bootstrapUsers() {
  const superAdminRole = await strapi.admin.services.role.getSuperAdmin();
  const input = {
    email: 'example@example.com',
    lastname: 'lastname',
    fistname: 'firstname',
  };

  if (!await strapi.admin.services.user.findOne({id: 1})) {
    await strapi.admin.services.user.create({
      ...input,
      registrationToken: null,
      isActive: true,
      roles: superAdminRole ? [superAdminRole.id] : [],
    });
  }

  const user = {
    email: 'example@example.com',
    confirmed: true,
    username: 'example@example.com',
    provider: 'local',
  };

  // const advanced = await strapi
  //       .store({
  //         environment: '',
  //         type: 'plugin',
  //         name: 'users-permissions',
  //         key: 'advanced',
  //       })
  //       .get();

  if (!user.role) {
    const defaultRole = await strapi
          .query('role', 'users-permissions')
          .findOne({ type: 'authenticated' }, []);

    user.role = defaultRole.id;
  }

  if (!await strapi.plugins['users-permissions'].services.user.fetch({id: 1})){
    await strapi.plugins['users-permissions'].services.user.add(user);
  }
};

async function setupStrapi() {
  if (!instance) {
    jest.setTimeout(62 * 1000);
    await setupFakeSpaIndex();
    /** the following code in copied from `./node_modules/strapi/lib/Strapi.js` */
    await Strapi().load();
    instance = strapi; // strapi is global now
    await instance.app
      .use(instance.router.routes()) // populate KOA routes
      .use(instance.router.allowedMethods()); // populate KOA methods

    instance.server = http.createServer(instance.app.callback());
    jest.setTimeout(5000);
  }
  return instance;
}
module.exports = { setupStrapi, bootstrapUsers };
