'use strict';

const restifyErrors = require('restify-errors');
const imdb = require('imdb');

module.exports = (req, res) => {
    const {filmId} = req.params;

    imdb(filmId, (err, data) => {
        if (err) {
            const error = `Error fetching movie data: ${restifyErrors(err)}`;
            console.log(error);
            return res.json({error});
        }
        
        res.json(data.rating);
    });
};
