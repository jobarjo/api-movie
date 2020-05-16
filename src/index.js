'use strict';

const restify = require('restify');

const getRating = require('./lib/rating');
const healthcheck = require('./lib/healthcheck');

const appConfig = require('./config/config');

const app = (config) => {
    const server = restify.createServer({name: config.server.name});
    
    server.use(restify.plugins.queryParser());

    server.get('/healthcheck', healthcheck(server));

    server.get('/rating/:id', getRating);

    return server;
};

let server;

if (require.main === module) {
    server = app(appConfig);

    server.listen(appConfig.server.port, () => {
        console.log('server listening', {server_url: server.url});
    });
}

module.exports = server || app;
