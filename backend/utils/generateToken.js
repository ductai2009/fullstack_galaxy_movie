const jwt = require('jsonwebtoken');
const ENV_VARS = require('../config/envVars.js');

const generateToken = (id, res) => {
    const token = jwt.sign({ id }, ENV_VARS.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('jwt_account', token, {
        httpOnly: true,
        secure: ENV_VARS.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return token;
};

module.exports = generateToken;
