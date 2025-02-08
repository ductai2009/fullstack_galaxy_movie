// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const userSearchSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        idSearch: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            default: '',
        },
        profile_path: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

const UserSearch = mongoose.model('UserSearch', userSearchSchema);
module.exports = UserSearch;
