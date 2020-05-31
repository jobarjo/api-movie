module.exports = {
  server: {
    host: process.env.HOST || 'localhost',
    port: 80,
    name: process.env.SERVER_NAME || 'be-api-movie',
  },
  logging: {
    enabled: process.env.LOGGING_ENABLED || true,
  },
};
