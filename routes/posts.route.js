const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth_middleware");
const multer  = require('multer')
const upload = multer()

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

router.get("/list", postsController.getPosts);
router.get("/:postsId", postsController.getPostById);
router.post("/write", authMiddleware, postsController.createPost);
router.put("/:postsId", authMiddleware, postsController.updatePost);
router.delete("/:postsId", authMiddleware, postsController.deletePost);
// router.get("/like", authMiddleware, postsController.getLikedPosts);

router.get('/like', postsController.getLikePosts)
router.put('/:postId/like', postsController.putLike)
router.post('/', upload.single('post'), postsController.createPost)

module.exports = router;
