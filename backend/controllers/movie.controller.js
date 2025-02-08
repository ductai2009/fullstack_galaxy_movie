const express = require('express');
const tmdbService = require('../services/tmdb.service.js');

const getTrendingMovies = async (req, res) => {
    try {
        const url = '3/trending/movie/day';

        const response = await tmdbService(url, 'GET');
        // const data = response.results[Math.floor(Math.random() * response.results?.length)];

        res.status(200).json({ success: true, message: 'success', data: response });
    } catch (err) {
        console.error('Error fetching trending movies:', err.message);
        return res.status(500).json({ success: false, message: 'Call api getTrendingMovies error' });
    }
};

const getTrailerMovie = async (req, res) => {
    try {
        const idMovie = req.params.movieId;

        const url = `3/movie/${idMovie}/videos`;
        const response = await tmdbService(url, 'GET', (params = { language: 'us-US' }));

        res.status(200).json({ success: true, message: 'success', data: response });
    } catch (err) {
        console.error('Error fetching getTrailerMovie:', err.message);
        return res.status(500).json({ success: false, message: 'Call api getTrailerMovie error' });
    }
};

const getDetailMovie = async (req, res) => {
    try {
        const idMovie = req.params.movieId;
        const url = `3/movie/${idMovie}`;
        const response = await tmdbService(url, 'GET', (params = { language: 'vi-VN' }));
        res.status(200).json({ success: true, message: 'success', data: response });
    } catch (err) {
        console.error('Error fetching getDetailMovie:', err.message);
        return res.status(500).json({ success: false, message: 'Call api getDetailMovie error' });
    }
};

const getSimilarMovie = async (req, res) => {
    try {
        const idMovie = req.params.movieId;
        const url = `3/movie/${idMovie}/similar`;
        const _params = { language: 'vi-VN', page: '1' };
        const response = await tmdbService(url, 'GET', _params);
        res.status(200).json({ success: true, message: 'success', data: response });
    } catch (err) {
        console.error('Error fetching getSimilarMovie:', err.message);
        return res.status(500).json({ success: false, message: 'Call api getSimilarMovie error' });
    }
};

const getCategoryMovie = async (req, res) => {
    try {
        const category = req.params.category;
        var categories = ['popular', 'top_rated', 'upcoming', 'now_playing'];
        if (!category) {
            return res.status(400).json({ success: false, message: 'Category is required' });
        }
        if (categories.includes(category) == false) {
            return res.status(400).json({ success: false, message: 'Category is not valid' });
        }
        const url = `3/movie/${category}`;
        const _params = { language: 'vi-VN', page: '1' };
        const response = await tmdbService(url, 'GET', _params);
        res.status(200).json({ success: true, message: 'success', data: response });
    } catch (err) {
        console.error('Error fetching getCategoryMovie:', err.message);
        return res.status(500).json({ success: false, message: 'Call api getCategoryMovie error' });
    }
};

module.exports = { getTrendingMovies, getTrailerMovie, getDetailMovie, getSimilarMovie, getCategoryMovie };
