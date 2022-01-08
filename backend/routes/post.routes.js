const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post.ctrl');

// #1 Get all posts
router.get('/posts', postCtrl.getAllPosts);

// #2 Get post by id
router.get('/posts/:id', postCtrl.getPostById);

// #3 Post 'post'
router.post('/posts', auth, postCtrl.createPost);

// #4 Delete post by id
router.delete('/posts/:id', auth, postCtrl.deletePost);

// #5 Modify post by id
router.patch('/posts/:id', auth, multer, postCtrl.modifyPost);

module.exports = router;
