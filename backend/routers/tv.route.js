const express = require('express');
const {
    getTrendingTv,
    getTrailerTv,
    getSimilarTv,
    getDetailTv,
    getCategoryTv,
} = require('../controllers/tv.controller.js');
const router = express.Router();

router.get('/trending', getTrendingTv);
router.get('/:idTv/trailer', getTrailerTv);
router.get('/:idTv/detail', getDetailTv);
router.get('/:idTv/similar', getSimilarTv);
router.get('/:category', getCategoryTv);

module.exports = router;
