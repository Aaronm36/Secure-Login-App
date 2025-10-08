const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const verifyUser = require('./middleware/auth');
const userRoutes = require('./routes/userRoutes');
const notesRoutes = require('./routes/notesRoutes');
require('./config/database');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(userRoutes);
app.use(notesRoutes);

app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.stack || err.message);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = { app };