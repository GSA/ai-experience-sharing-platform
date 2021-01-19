const request = require('supertest');
const { setupStrapi, bootstrapUsers } = require('../helpers/strapi');

beforeAll(async done => {
  await setupStrapi();
  await bootstrapUsers();
  done();
});

afterAll((done) => {
  strapi.server.close(() => done());
});

it('should not allow anonymous access', async done => {
  await request(strapi.server)
    .get('/api-usecase-settings')
    .expect(403);
  done();
});

it('should allow authenticated access', async done => {
  const jwt = strapi.plugins['users-permissions'].services.jwt.issue({id: 1});

  await request(strapi.server)
    .get('/api-usecase-settings')
    .set('Authorization', `Bearer ${jwt}`)
    .expect(200);
  done();
});
