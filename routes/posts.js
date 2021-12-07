import express from 'express';

const router = express.Router();

//http:localhost:5000/posts

import {getPosts, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';


router.get('/', getPosts );
router.post('/', createPost );
router.patch('/:id', updatePost );
router.patch('/:id/likePost', likePost);
router.delete('/:id', deletePost );



export default router;