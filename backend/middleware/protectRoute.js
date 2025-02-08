const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ENV_VARS = require('../config/envVars.js');
const User = require('../models/user.model.js');

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt_account;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Vui lòng đăng nhập' });
        }
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Vui lòng đăng nhập' });
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy user đăng nhập' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.log('Server check protect route error:', err.message);
        return res.status(500).json({ success: false, message: 'Server check protect route error ' });
    }
};

module.exports = protectRoute;
