const pool = require('../config/database');

const newNote = async (userId, content, content_hash, signature) =>{
    const [note] = await pool.query(
        'INSERT INTO notes (userId, content, content_hash, signature) VALUES (?, ?, ?, ?)', [userId, content, content_hash, signature]
    );

    const noteId = note.insertId;
    return getNoteById(noteId);
};

const getAllNotesByUser = async (id) => {
    const [rows] = await pool.query('SELECT notes.id, notes.content, notes.userId, users.username FROM notes JOIN users ON notes.userId = users.userId where users.userId = ?', [id]);
    return rows;
};

const getAllNotes = async () => {
    const [rows] = await pool.query('SELECT notes.id, notes.content, notes.userId, users.username FROM notes JOIN users ON notes.userId = users.userId');
    return rows;
}

const getNoteById = async (id) => {
    const [row] = await pool.query('SELECT * FROM notes WHERE id = ?', [id]);
    return row;

};

const updateNoteById = async (content, id) => {
    const [row] = await pool.query('UPDATE notes SET content = ? WHERE id = ?',
        [content, id]);

    return row;
};

const removeNoteById = async (id) => {
    const [row] = await pool.query('DELETE FROM notes WHERE id = ?', [id]);

    return row;
};

module.exports = {
    newNote,
    getAllNotesByUser,
    getNoteById,
    updateNoteById,
    removeNoteById,
    getAllNotes
};