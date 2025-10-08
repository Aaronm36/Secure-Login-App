const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { newUser, getUsersByUsername } = require('../models/userModel');
const jwtSecret = process.env.JWT_SECRET

const register = async (req, res) => {
    try {
        const {username, password, role, public_key, private_key_encrypted} = req.body;
        const existingUser = await getUsersByUsername(username);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await newUser(username, hashedPassword, role, public_key, private_key_encrypted);

        return res.status(201).json({ message: 'Account created', user: createdUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const users = await getUsersByUsername(username);

        if (!users.length) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ name: user.username, userId: user.userId, role: user.role }, jwtSecret, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });

        return res.json({ message: 'Login successful', token, user: { id: user.userId, role: user.role, username: user.username} });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
};

module.exports = {
    register,
    login,
    logout
};