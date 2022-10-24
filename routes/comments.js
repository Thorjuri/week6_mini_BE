const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

router.get("/:postId", commentController.getComments); // 댓글 조회
router.post("/:postId", authMiddleware, commentController.createComment); // 댓글 생성
router.put("/:postId/:commentId", authMiddleware, commentController.updateComment); // 댓글 수정
router.delete("/:postId/:commentId", authMiddleware, commentController.deleteComment); // 댓글 삭제

module.exports = router;
