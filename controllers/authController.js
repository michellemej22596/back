// src/controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../models/userModel.js';

const saltRounds = 10;
const jwtSecret = 'your-secret-key'; // Usa una clave más segura en producción

// Registro de usuario
export async function register(req, res) {
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.status(409).json({ error: 'El correo electrónico ya está en uso.' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear el nuevo usuario
    const result = await createUser(username, email, hashedPassword);
    res.status(201).json({ message: 'Usuario registrado exitosamente.', userId: result.insertId });
}

// Inicio de sesión
export async function login(req, res) {
    const { email, password } = req.body;

    // Obtener el usuario por su correo electrónico
    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Verificar la contraseña
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
    res.json({ message: 'Inicio de sesión exitoso.', token });
}
