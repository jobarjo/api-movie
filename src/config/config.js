'use strict';

module.exports = {
    'server': {
        'host': process.env.APP_HOST || 'localhost',
        'port': process.env.APP_PORT || 8080,
        'name': process.env.SERVER_NAME || 'api-movie'
    }
};
