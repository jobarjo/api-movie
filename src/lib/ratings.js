const hl = require('highland');
const R = require('ramda');
const utils = require('./utils');

module.exports = (req, res) => {
  const { id, title, year } = req.query;

  hl([
    utils.getImdbRating(id),
    utils.getFilmAffinityRating(title, year),
  ])
    .reject(R.isNil)
    .otherwise()
    .collect()
    .map()
    .toCallback((err, data) => res.json(data));
};
