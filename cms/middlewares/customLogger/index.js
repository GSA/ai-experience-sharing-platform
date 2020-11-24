const chalk = require('chalk');

const codeToColor = code => {
  return code >= 500
    ? chalk.red(code)
    : code >= 400
    ? chalk.yellow(code)
    : code >= 300
    ? chalk.cyan(code)
    : code >= 200
    ? chalk.green(code)
    : code;
};

module.exports = strapi => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const delta = Math.ceil(Date.now() - start);

        strapi.log.debug(`${ctx.method} ${ctx.url} (${delta} ms) ${ctx.status}`);
      });
    },
  };
};
