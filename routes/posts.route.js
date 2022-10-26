const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth_middleware");
const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();
const upload = require('../middlewares/upload_image')

router.put('/:postId/like', authMiddleware, postsController.putLike)
router.get('/like', authMiddleware, postsController.getLikePosts)
// router.post('/', upload.single('post'), postsController.createPost)


router.get("/list", postsController.getPosts);
router.get("/:postId", postsController.getPostById);
router.post("/write", authMiddleware, upload.single('postPicture'), postsController.createPost);
router.put("/:postId", authMiddleware, postsController.updatePost);
router.delete("/:postId", authMiddleware, postsController.deletePost);
// router.get("/like", authMiddleware, postsController.getLikedPosts);


module.exports = router;
