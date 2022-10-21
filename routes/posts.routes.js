const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();
const authMiddleware = require('../middlewares/auth-Middleware');

// router.get('/', postsController.getPosts);
router.get('/like', authMiddleware, postsController.getLikePosts)
router.put('/:postId/like', authMiddleware, postsController.putLike)
// router.get('/:postId', authMiddleware, postsController.getPostsDetail);
// router.post('/', authMiddleware, postsController.createPost);
// router.put('/:postId', authMiddleware, postsController.amendPost);
// router.delete('/:postId', authMiddleware, postsController.deletePost);


module.exports = router; // router를 모듈로써 내보냄