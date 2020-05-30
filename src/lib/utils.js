const restifyErrors = require('restify-errors');
const imdb = require('imdb');
const fa = require('faparser');
const hl = require('highland');
const R = require('ramda');

module.exports = {
  getImdbRating: (id) => imdb(id, (err, data) => {
    if (err) {
      const error = `Error fetching IMDB movie with id: ${id}; error: ${restifyErrors(err)}`;
      console.log(error);
      return undefined;
    }

    return data.rating;
  }),

  getFilmAffinityRating: (title, year) => {
    const search = {
      query: title,
      lang: 'uk',
      type: fa.TITLE,
      start: 0,
    };

    hl(fa.search(search))
      .errors((err) => {
        const error = `Error searching FilmAffinity with title: ${title} and year: ${year}; error: ${restifyErrors(err)}`;
        console.log(error);
      })
      .map(R.path(['result']))
      .sequence()
      .filter(filterByYear(year))
      .collect()
      .toCallback((err, data) => {
        if (data.length === 0) {
          const error = `Error. No result from FilmAffinity search with title: ${title} and year: ${year}`;
          console.log(error);
          return undefined;
        }

        if (data.length > 1) {
          const error = `Error. Several results from FilmAffinity search with title: ${title} and year: ${year}`;
          console.log(error);
          return undefined;
        }

        return R.compose(
          R.path(['rating']),
          R.head(data),
        );
      });
  },
};

function filterByYear(year) {
  return R.compose(
    R.equals(year),
    R.path(['year']),
  );
}
