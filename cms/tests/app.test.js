const request = require('supertest');
const { setupStrapi } = require('./helpers/strapi');

beforeAll(async done => {
  await setupStrapi();
  done();
});

afterAll((done) => {
  strapi.server.close(() => done());
});

it('should define strapi', () => {
  expect(strapi).toBeDefined();
});

it('should use the SPA for 404\'s', async (done) => {
  await request(strapi.server)
    .get('/this-should-not-exist')
    .expect(200).then(data => {
      expect(data.type).toMatch('text/html');
      expect(data.text).toMatch('</html>');
    });
  done();
});
