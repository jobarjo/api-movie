const { serializeError } = require('serialize-error');
const imdb = require('imdb');
const fa = require('faparser');
const hl = require('highland');
const R = require('ramda');

module.exports = {
  getImdbRating: (logger, id) => hl.wrapCallback(imdb)(id)
    .map(R.path(['rating']))
    .errors((err) => {
      const message = `Error fetching IMDB movie with id: ${id}`;
      logger.error(message, { error: serializeError(err) });
    })
    .otherwise(hl((push) => {
      logger.debug(`No movies found on IMDB with id: ${id}`);
      push(null, '');
      push(null, hl.nil);
    })),

  getFilmAffinityRating: (logger, title, year) => {
    const search = {
      query: title,
      lang: 'uk',
      type: fa.TITLE,
      start: 0,
    };

    return hl(fa.search(search))
      .map(R.path(['result']))
      .sequence()
      .filter(filterByYear(year))
      .filter(filterByTitle(title))
      .map(R.path(['rating']))
      .errors((err) => {
        const message = `Error searching FilmAffinity with title: ${title} and year: ${year}`;
        logger.error(message, { error: serializeError(err) });
      })
      .collect()
      .filter((results) => results.length === 1)
      .otherwise(hl((push) => {
        logger.debug(`Cannot process film affinity results. 0 or several movies found for title: ${title} and year: ${year}`);
        push(null, ['']);
        push(null, hl.nil);
      }))
      .map(R.head);
  },
};

function filterByTitle(title) {
  return R.compose(
    R.equals(R.toLower(title)),
    R.toLower,
    R.path(['title']),
  );
}

function filterByYear(year) {
  return R.compose(
    R.equals(Number(year)),
    (imdbYear) => Number(imdbYear),
    R.path(['year']),
  );
}
