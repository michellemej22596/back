// src/models/userModel.js
import pool from '../config/db.js';

// Crear un nuevo usuario
export async function createUser(username, email, hashedPassword) {
    const [result] = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
    );
    return result;
}

// Obtener un usuario por correo electrónico
export async function getUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}
