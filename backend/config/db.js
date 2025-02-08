// import mongoose from 'mongoose';
// import { ENV_VARS } from './envVars.js';
const mongoose = require('mongoose');
const ENV_VARS = require('./envVars.js');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGODB_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connected Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
