require('dotenv').config();
const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/userController');

router.post('/users', register);
router.post('/users/login', login);
router.get('/logout', logout);

module.exports = router;