module.exports = {
  load: {
    before: ["authCookie"],
    after: ["spa"],
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
