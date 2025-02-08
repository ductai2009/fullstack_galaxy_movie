const tmdbService = require('../services/tmdb.service.js');

const getTrendingTv = async (req, res) => {
    try {
        const url = '3/trending/tv/day';

        const response = await tmdbService(url, 'GET');
        // const data = response.results[Math.floor(Math.random() * response.results?.length)];

        res.status(200).json({ success: true, message: 'success', data: response });
    } catch (err) {
        console.error('Error fetching trending tv:', err.message);
        if (err.response.data.status_code == 34) {
            return res.status(404).json({ success: false, message: 'Tv trending not found' });
        }
        return res.status(500).json({ success: false, message: 'Call api getTrendingTv error' });
    }
};

const getTrailerTv = async (req, res) => {
    try {
        const idTv = req.params.idTv;

        const url = `3/tv/${idTv}/videos`;
        const response = await tmdbService(url, 'GET', (params = { language: 'us-US' }));

        res.status(200).json({ success: true, message: 'success', data: response });
    } catch (err) {
        console.error('Error fetching getTrailerTv:', err.message);
        if (err.response.data.status_code == 34) {
            return res.status(404).json({ success: false, message: 'Tv Trailer not found' });
        }
        return res.status(500).json({ success: false, message: 'Call api getTrailerTv error' });
    }
};

const getDetailTv = async (req, res) => {
    try {
        const idTv = req.params.idTv;
        const url = `3/tv/${idTv}`;
        const response = await tmdbService(url, 'GET', (params = { language: 'vi-VN' }));
        console.log(response);
        res.status(200).json({ success: true, message: 'success', data: response });
    } catch (err) {
        console.error('Error fetching getDetailTv:', err.message);
        if (err.response.data.status_code == 34) {
            return res.status(404).json({ success: false, message: 'Tv show not found' });
        }
        return res.status(500).json({ success: false, message: 'Call api getDetailTv error' });
    }
};

const getSimilarTv = async (req, res) => {
    try {
        const idTv = req.params.idTv;
        const url = `3/tv/${idTv}/similar`;
        const _params = { language: 'vi-VN', page: '1' };
        const response = await tmdbService(url, 'GET', _params);
        res.status(200).json({ success: true, message: 'success', data: response });
    } catch (err) {
        console.error('Error fetching getSimilarTv:', err.message);
        if (err.response.data.status_code == 34) {
            return res.status(404).json({ success: false, message: 'Tv Similar not found' });
        }
        return res.status(500).json({ success: false, message: 'Call api getSimilarTv error' });
    }
};

const getCategoryTv = async (req, res) => {
    try {
        const category = req.params.category;
        var categories = ['popular', 'top_rated', 'upcoming', 'now_playing'];
        if (!category) {
            return res.status(400).json({ success: false, message: 'Category is required' });
        }
        if (categories.includes(category) == false) {
            return res.status(400).json({ success: false, message: 'Category is not valid' });
        }
        const url = `3/tv/${category}`;
        const _params = { language: 'vi-VN', page: '1' };
        const response = await tmdbService(url, 'GET', _params);
        res.status(200).json({ success: true, message: 'success', data: response });
    } catch (err) {
        console.error('Error fetching getCategoryTv:', err.message);
        if (err.response.data.status_code == 34) {
            return res.status(404).json({ success: false, message: `Tv Category  not found` });
        }
        return res.status(500).json({ success: false, message: 'Call api getCategoryTv error' });
    }
};

module.exports = { getTrendingTv, getTrailerTv, getDetailTv, getSimilarTv, getCategoryTv };
