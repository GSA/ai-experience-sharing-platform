const _ = require('lodash');
const request = require('supertest');
const { setupStrapi, bootstrapUsers } = require('../../../helpers/strapi');

beforeAll(async done => {
  await setupStrapi();
  await bootstrapUsers();
  done();
});

afterAll((done) => {
  strapi.server.close(() => done());
});

afterEach(() => {
  jest.restoreAllMocks();
});

const exampleS3Payload = {
  Body: 'hi there',
  ContentType: 'text/plain'
};

it('should return media when the request has a media cookie', async done => {
  const spy = jest.spyOn(strapi.plugins['upload-auth'].provider, 'getObject');
  strapi.plugins['upload-auth'].provider.getObject.mockReturnValue({
    promise: () => (Promise.resolve(exampleS3Payload))
  });

  const jwt = strapi.plugins['users-permissions'].services.jwt.issue({id: 1});

  await request(strapi.server)
    .get('/upload-auth/secure_file.txt')
    .set('Cookie', [`media_auth=${jwt}`])
    .expect('Content-Type', /text/)
    .expect(200, /hi there/).then((data) => {
      done();
    });
});

it('should return media when the request is authenticated', async done => {
  const spy = jest.spyOn(strapi.plugins['upload-auth'].provider, 'getObject');
  strapi.plugins['upload-auth'].provider.getObject.mockReturnValue({
    promise: () => (Promise.resolve(exampleS3Payload))
  })

  const jwt = strapi.plugins['users-permissions'].services.jwt.issue({id: 1});

  await request(strapi.server)
    .get('/upload-auth/secure_file.txt')
    .set('Authorization', `Bearer ${jwt}`)
    .expect('Content-Type', /text/)
    .expect(200, /hi there/).then((data) => {
      done();
    });
});

it('should return a SPA 404 when the request is not authenticated and there is no cookie', async done => {
  const spy = jest.spyOn(strapi.plugins['upload-auth'].provider, 'getObject');
  strapi.plugins['upload-auth'].provider.getObject.mockReturnValue({
    promise: () => (Promise.resolve(exampleS3Payload))
  })

  await request(strapi.server)
    .get('/upload-auth/secure_file.txt')
    .expect('Content-Type', /html/)
    .expect(200, /Fake SPA/).then((data) => {
      done();
    });
});

it('should remove the cookie when the request is logout', async done => {
  const jwt = strapi.plugins['users-permissions'].services.jwt.issue({id: 1});

  await request(strapi.server)
    .post('/upload-auth/logout')
    .send({})
    .set('Cookie', [`media_auth=${jwt}`])
    .expect('Content-Type', /json/)
    .expect(200, /\{\}/).then((data) => {
      const mediaCookie = _.find(data.headers['set-cookie'], (h => _.startsWith(h, 'media_auth=')));
      expect(mediaCookie).toMatch(/media_auth=;/);
      done();
    });
});
