module.exports = {
 load: {
   after: ['spa', 'authCookie'],
  },
  settings: {
    spa: {
      enabled: true,
    },
    authCookie: {
      enabled: true,
    },
  },
};
