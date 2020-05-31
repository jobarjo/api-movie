const restify = require('restify');
const getRatings = require('./lib/ratings');
const healthcheck = require('./lib/healthcheck');
const appConfig = require('./config/config');
const LoggerFactory = require('./utils/logger');

const logger = LoggerFactory.create({
  enabled: appConfig.logging.enabled,
  defaultMeta: { service: appConfig.server.name },
});

const app = (config) => {
  const server = restify.createServer({ name: config.server.name });

  server.use(restify.plugins.queryParser());

  server.get('/', healthcheck(server));

  server.get('/ratings', getRatings(logger));

  return server;
};

let server;

if (require.main === module) {
  server = app(appConfig);

  server.listen(appConfig.server.port, () => {
    logger.info('server listening', { server_url: server.url });
  });
}

module.exports = server || app;
