'use strict';

module.exports = {
    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 80,
        name: process.env.SERVER_NAME || 'be-api-movie'
    }
};
