
const restify = require('restify');

const getRatings = require('./lib/ratings');
const healthcheck = require('./lib/healthcheck');

const appConfig = require('./config/config');

const app = (config) => {
  const server = restify.createServer({ name: config.server.name });

  server.use(restify.plugins.queryParser());

  server.get('/', healthcheck(server));

  server.get('/ratings', getRatings);

  return server;
};

let server;

if (require.main === module) {
  server = app(appConfig);

  server.listen(appConfig.server.port, () => {
    console.log('url: ', appConfig.server.host);
    console.log('server listening', { server_url: server.url });
  });
}

module.exports = server || app;
