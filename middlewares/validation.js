// src/middlewares/validation.js
export default function validateData(req, res, next) {
    if (req.method === 'POST' || req.method === 'PUT') {
        // eslint-disable-next-line no-unused-vars
        const { title, description, team, goals_scored, image_base64 } = req.body;

        if (!title || typeof title !== 'string') {
            return res.status(400).json({ error: 'El campo "title" es requerido y debe ser una cadena de caracteres.' });
        }

        // Puedes añadir más validaciones para otros campos si es necesario

        next();
    } else {
        next();
    }
}
