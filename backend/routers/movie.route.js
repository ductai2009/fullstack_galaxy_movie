const express = require('express');
const {
    getTrendingMovies,
    getTrailerMovie,
    getSimilarMovie,
    getDetailMovie,
    getCategoryMovie,
} = require('../controllers/movie.controller.js');
const router = express.Router();

router.get('/trending', getTrendingMovies);
router.get('/:movieId/trailer', getTrailerMovie);
router.get('/:movieId/detail', getDetailMovie);
router.get('/:movieId/similar', getSimilarMovie);
router.get('/:category', getCategoryMovie);

module.exports = router;
