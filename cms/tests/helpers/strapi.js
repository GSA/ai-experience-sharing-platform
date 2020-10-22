const fs = require('fs').promises;
const path = require('path');
const Strapi = require('strapi');
const http = require('http');

let instance;

const fakeSpaIndex = '<html><head><title>Fake SPA Index</title></head><body></body></html>';

const setupFakeSpaIndex = async () => {
  const publicDir = path.join(__dirname, '../../public');
  try {
    await fs.mkdir(publicDir);
  } catch (err) {}
  try {
    await fs.writeFile(path.join(publicDir, 'index.html'), fakeSpaIndex, { flag: 'wx' })
  } catch (err) {}
};

async function setupStrapi() {
  if (!instance) {
    jest.setTimeout(32 * 1000);
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
module.exports = { setupStrapi };
