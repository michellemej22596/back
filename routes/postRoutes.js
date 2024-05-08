    // src/routes/postsRoutes.js
import express from 'express';
import {
    fetchAllPosts, fetchPostById, addNewPost, modifyPost, removePost
} from '../controllers/postController.js';

const router = express.Router();

router.get('/', fetchAllPosts);
router.get('/:postId', fetchPostById);
router.post('/', addNewPost);
router.put('/:postId', modifyPost);
router.delete('/:postId', removePost);

export default router;
