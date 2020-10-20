module.exports = {
 load: {
   after: ['spa', 'authCookie', 'parser', 'router'],
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
