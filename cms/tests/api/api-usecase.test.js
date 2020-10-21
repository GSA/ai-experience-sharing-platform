const request = require('supertest');
const { setupStrapi } = require('../helpers/strapi');

beforeAll(async done => {
  await setupStrapi();
  done();
});

afterAll((done) => {
  strapi.server.close(() => done());
});

it('should not allow anonymous access', async done => {
  await request(strapi.server)
    .get('/api-usecases')
    .expect(403);
  done();
});
