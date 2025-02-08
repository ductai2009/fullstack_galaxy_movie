const express = require('express');
const { register, login, logout } = require('../controllers/auth.controller.js');
const router = express.Router();

router.get('/login', login);

router.get('/logout', logout);

router.post('/register', register);
module.exports = router;
