// src/controllers/postsController.js
import {
    getAllPosts, getPostById, createPost, updatePost, deletePost
} from '../models/postModel.js';

export async function fetchAllPosts(req, res) {
    const posts = await getAllPosts();
    res.json(posts);
}

export async function fetchPostById(req, res) {
    const { postId } = req.params;
    const post = await getPostById(postId);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post no encontrado' });
    }
}

export async function addNewPost(req, res) {
    const { title, description, team, goals_scored, image_base64 } = req.body;
    const result = await createPost(title, description, team, goals_scored, image_base64);
    res.json(result);
}

export async function modifyPost(req, res) {
    const { postId } = req.params;
    const { title, description, team, goals_scored, image_base64 } = req.body;
    const result = await updatePost(postId, title, description, team, goals_scored, image_base64);

    if (result.affectedRows > 0) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Post no encontrado' });
    }
}

export async function removePost(req, res) {
    const { postId } = req.params;
    const result = await deletePost(postId);

    if (result.affectedRows > 0) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Post no encontrado' });
    }
}
