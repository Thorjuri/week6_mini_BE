const CommentService = require('../services/comment.service');
const Joi = require('joi');

const commentSchema = Joi.object({
  comment: Joi.string().pattern(new RegExp(/^[\s\S]{1,100}$/)).required(),});

class CommentController {
  commentService = new CommentService();

  // 댓글 조회 (특정 게시글)
  getComments = async (req, res, next) => {
    const { postId } = req.params;
    
    try {
      const commentListUp = await this.commentService.findAllComment(postId);
      res.status(200).json({ data: commentListUp });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // 댓글 생성
  createComment = async (req, res, next) => {
    const { postId } = req.params;
    const { id, nickname } = res.locals.user;
       
    try {
      const { comment } = await commentSchema.validateAsync(req.body);
      
      const createCommentData = await this.commentService.createCmt(
        comment, 
        postId,
        id,
        nickname,   
      );
      res.status(201).json({ data: createCommentData });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // 댓글 수정 "요청"
  updateComment = async (req, res, next) => {
    const { commentId } = req.params;
    const id = res.locals.user.id;

    try {
      const { comment } = await commentSchema.validateAsync(req.body);  
      const updateCommentDate = await this.commentService.updateCmt(
        comment,
        commentId,
        id
      );
      res.status(201).json({ message: updateCommentDate });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // 댓글 삭제 "요청"
  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const id = res.locals.user.id;

    try {
      const deleteCommentDate = await this.commentService.deleteCmt(
        commentId,
        id
      );
      res.status(200).json({ message: deleteCommentDate });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

module.exports = CommentController;