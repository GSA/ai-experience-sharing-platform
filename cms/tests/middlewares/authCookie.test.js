const _ = require('lodash');
const request = require('supertest');
const { setupStrapi } = require('../helpers/strapi');

beforeAll(async done => {
  await setupStrapi();
  done();
});

afterAll((done) => {
  strapi.server.close(() => done());
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('should set a cookie when a user is authenticated', async done => {
  const spy = jest.spyOn(strapi.plugins['users-permissions'].services.providers, 'connect');
  strapi.plugins['users-permissions'].services.providers.connect.mockResolvedValue([{
      "id": 1,
      "username": "example@example.com",
      "email": "example@example.com",
      "provider": "logingov",
      "confirmed": true,
      "blocked": null,
      "created_at": "2020-10-20T19:30:30.017Z",
      "updated_at": "2020-10-20T19:30:30.025Z"
  }]);

  await request(strapi.server)
    .get('/auth/logingov/callback')
    .expect(200).then((data) => {
      const mediaCookie = _.find(data.headers['set-cookie'], (h => _.startsWith(h, 'media_auth=')));
      expect(mediaCookie).toMatch(/.+\..+\..+;/);
      expect(mediaCookie).toMatch(/httponly/);
      done();
    });
});

it('should not set a cookie when a user is not authenticated', async done => {
  const spy = jest.spyOn(strapi.plugins['users-permissions'].services.providers, 'connect');
  strapi.plugins['users-permissions'].services.providers.connect.mockResolvedValue([null, {message: "Problem with the user"}]);

  await request(strapi.server)
    .get('/auth/logingov/callback')
    .expect(400).then((data) => {
      const mediaCookie = _.find(data.headers['set-cookie'], (h => _.startsWith(h, 'media_auth=')));
      expect(mediaCookie).toBeUndefined()
      done();
    });
});

it('should not set a cookie when a user is not authenticated', async done => {
  const spy = jest.spyOn(strapi.plugins['users-permissions'].services.providers, 'connect');
  strapi.plugins['users-permissions'].services.providers.connect.mockResolvedValue([null, null]);

  await request(strapi.server)
    .get('/auth/logingov/callback')
    .expect(400).then((data) => {
      const mediaCookie = _.find(data.headers['set-cookie'], (h => _.startsWith(h, 'media_auth=')));
      expect(mediaCookie).toBeUndefined()
      done();
    });
});
