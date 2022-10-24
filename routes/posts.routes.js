const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();
const authMiddleware = require('../middlewares/auth-Middleware');
const multer  = require('multer')
const upload = multer()


router.get('/like', postsController.getLikePosts)
router.put('/:postId/like', postsController.putLike)
router.post('/', upload.single('post'), postsController.createPost)


module.exports = router; // router를 모듈로써 내보냄