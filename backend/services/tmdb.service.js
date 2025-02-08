const axios = require('axios');
const ENV_VARS = require('../config/envVars.js');

const tmdbService = async function tmdbService(url, method = 'GET', _params = { language: 'vi-VN' }) {
    const options = {
        method: method,
        url: ENV_VARS.TMDB_API_URL + url,
        params: _params,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY,
        },
    };

    const response = await axios.request(options);
    return response.data;
};

module.exports = tmdbService;
