const fs = require('fs');
const { setupStrapi } = require('./helpers/strapi');

beforeAll(async done => {
  await setupStrapi();
  done();
});

afterAll(async done => {
  strapi.server.close( () => done())
});

it('should be a sane env with strapi defined', () => {
  expect(strapi).toBeDefined();
});
