// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default: '',
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
