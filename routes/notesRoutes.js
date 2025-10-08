const express = require('express');
require('dotenv').config();
const router = express.Router();
const { createNote, getNotes, getNote, updateNote, deleteNote, getAllNotesForAdmin } = require('../controllers/notesController');
const verifyUser = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');

router.post('/notes', verifyUser, authorizeRoles("admin", "user"), createNote);
router.get('/notes',verifyUser, authorizeRoles("admin", "user"),  getNotes);
router.get('/notes/admin',verifyUser, authorizeRoles("admin", "user"),  getAllNotesForAdmin);
router.get('/notes/:id', verifyUser, getNote);
router.put('/notes/:id', verifyUser, updateNote);
router.delete('/notes/:id', verifyUser, deleteNote);

module.exports = router;