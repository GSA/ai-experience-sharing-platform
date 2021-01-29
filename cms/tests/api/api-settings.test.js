const request = require('supertest');
const { setupStrapi } = require('../helpers/strapi');

beforeAll(async done => {
  await setupStrapi();
  done();
});

afterAll((done) => {
  strapi.server.close(() => done());
});

it('should allow anonymous access', async done => {
  await request(strapi.server)
    .get('/api-settings')
    .expect(200);
  done();
});
