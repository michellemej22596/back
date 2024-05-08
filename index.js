// src/app.js
import express from 'express';
import cors from 'cors';
import postsRoutes from './routes/postRoutes.js';
import authRoutes from './routes/authRoutes.js';
import validateData from './middlewares/validation.js';

const app = express();
const port = 22596;

app.use(express.json());
app.use(cors());

// Usar las rutas de posts
app.use('/posts', postsRoutes);


// Usar las rutas de autenticación
app.use('/auth', authRoutes);

// Middleware de validación
app.use(validateData);

// Middleware para manejar errores
app.use((err, req, res) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
