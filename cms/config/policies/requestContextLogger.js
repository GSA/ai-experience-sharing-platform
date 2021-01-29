module.exports = async (ctx, next) => {
  const asyncLocalStorage = strapi.app.context.asyncLocalStorage.getStore();
  if (ctx.state && ctx.state.admin) {
    for (const prop of [['adminId', 'id'], ['adminUsername', 'email']]) {
      if (ctx.state.admin[prop[1]]) {
        asyncLocalStorage[prop[0]] = ctx.state.admin[prop[1]];
      }
    }
  }
  if (ctx.state && ctx.state.user) {
    for (const prop of [['userId', 'id'], ['username', 'email']]) {
      if (ctx.state.user[prop[1]]) {
        asyncLocalStorage[prop[0]] = ctx.state.user[prop[1]];
      }
    }
  }
  if (ctx.request && ctx.request.ip) {
    asyncLocalStorage.requestIp = ctx.request.ip;
  }
  return next();
};
