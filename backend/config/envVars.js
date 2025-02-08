// import dotenv from 'dotenv';
const dotenv = require('dotenv');
dotenv.config();

module.exports = ENV_VARS = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    TMDB_API_URL: process.env.TMDB_API_URL,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
};
