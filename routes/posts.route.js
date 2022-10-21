const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

router.get("/list", postsController.getPosts);
router.get("/:postsId", postsController.getPostById);
router.post("/write", authMiddleware, postsController.createPost);
router.put("/:postsId", authMiddleware, postsController.updatePost);
router.delete("/:postsId", authMiddleware, postsController.deletePost);
// router.get("/like", authMiddleware, postsController.getLikedPosts);

module.exports = router;
