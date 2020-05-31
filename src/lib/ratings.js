const hl = require('highland');
const { serializeError } = require('serialize-error');
const utils = require('./utils');

module.exports = (logger) => (req, res) => {
  const { id, title, year } = req.query;

  hl([
    utils.getImdbRating(logger, id),
    utils.getFilmAffinityRating(logger, title, year),
  ])
    .parallel(2)
    .errors((err) => {
      const message = 'Error fetching movie data';
      logger.error(message, { error: serializeError(err) });
    })
    .collect()
    .toCallback((err, data) => {
      res.json({
        imdb: data[0],
        filmAffinity: data[1],
      });
    });
};
