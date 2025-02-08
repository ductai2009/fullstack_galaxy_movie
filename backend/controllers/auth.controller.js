const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');
const login = async function (req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Các trường bắt buộc không được để trống' });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Email khống tồn tại' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Mật khẩu không chính xác' });
        }
        generateToken(user._id, res);
        return res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            ...user._doc,
            password: '',
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const logout = function (req, res) {
    try {
        res.clearCookie('jwt_account');
        return res.status(200).json({ success: true, message: 'Đăng xuat thanh cong' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const register = async function (req, res) {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: 'Các trường bắt buộc không được để trống' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Email không hợp lệ' });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Mật khật phải nhất 6 ki tự' });
        }
        const checkEmail = await User.findOne({ email: email });
        const checkUsername = await User.findOne({ username: username });
        if (checkUsername) {
            return res.status(400).json({ success: false, message: 'Username đã tồn tại' });
        }
        if (checkEmail) {
            return res.status(400).json({ success: false, message: 'Email đã tồn tại' });
        }

        const image_arr = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];
        const randomIndex = Math.floor(Math.random() * image_arr.length);
        const randomImage = image_arr[randomIndex];

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email: email,
            password: hashedPassword,
            username: username,
            image: randomImage,
        });
        generateToken(user._id, res);
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Đăng ký thành công',
            user: {
                ...user._doc,
                password: '',
            },
        });
    } catch (err) {
        console.log('register error: ', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
module.exports = { login, logout, register };
