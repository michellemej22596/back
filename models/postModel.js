// src/models/postModel.js
import pool from '../config/db.js';

// Obtener todos los posts
export async function getAllPosts() {
    const [rows] = await pool.query('SELECT * FROM blog_posts');
    return rows;
}

// Obtener un post por su ID
export async function getPostById(postId) {
    const [rows] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [postId]);
    return rows[0];
}

// Crear un post
export async function createPost(title, description, team, goals_scored, image_base64) {
    const [result] = await pool.query('INSERT INTO blog_posts (title, description, team, goals_scored, image_base64) VALUES (?, ?, ?, ?, ?)', [title, description, team, goals_scored, image_base64]);
    return result;
}

// Modificar un post por su ID
export async function updatePost(postId, title, description, team, goals_scored, image_base64) {
    const [result] = await pool.query('UPDATE blog_posts SET title = ?, description = ?, team = ?, goals_scored = ?, image_base64 = ? WHERE id = ?', [title, description, team, goals_scored, image_base64, postId]);
    return result;
}

// Borrar un post por su ID
export async function deletePost(postId) {
    const [result] = await pool.query('DELETE FROM blog_posts WHERE id = ?', [postId]);
    return result;
}
