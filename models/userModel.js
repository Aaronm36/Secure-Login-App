const pool = require('../config/database');

const newUser = async (username, password, role, public_key, private_key_encrypted) => {
    const [user] = await pool.query(
        'INSERT INTO users (username, password, role, public_key, private_key_encrypted) VALUES (?, ?, ?, ?, ?)',
        [username, password, role, public_key, private_key_encrypted]
    );
    const id = user.insertId;
    return getUsersById(id);
};

const getUsersById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE userid = ?', [id]);
    return rows;
};

const getUsersByUsername = async (username) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows;
};

const removeUserById = async (id) => {
    const [row] = await pool.query('DELETE FROM user WHERE userId = ?', [id]);

    if(getUsersById(id)){
        return true;
    } else {
        return false;
    }
};

module.exports = {
    newUser,
    getUsersById,
    getUsersByUsername,
    removeUserById
};