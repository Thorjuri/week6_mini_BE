const { Comments } = require('../models'); // DB영역에서는 꼭 필요한 존재.

class CommentRepository {
  // 댓글 조회
  findAllComment = async ( postId ) => {
    const allComment = await Comments.findAll({
      where: { postId },
      attributes: { exclude: ['postId'] },
      order: [['createdAt', 'DESC']],
    });
    return allComment;
  };

  // 댓글 생성
  createCmt = async ( comment, postId, id, nickname ) => {
    const createCommentData = await Comments.create({
      comment,
      postId,
      id,
      nickname,
    });
    return createCommentData;
  };

  // 댓글 수정
  updateCmt = async (comment, commentId, id) => {
    const updateCommentData = await Comments.update(
      { comment },
      { where: { commentId, id } }
    );
    return updateCommentData;
  };

  // 댓글 삭제
  deleteCmt = async (commentId, id) => {
    const deleteCommentData = await Comments.destroy({
      where: { commentId, id },
    });
    return deleteCommentData;
  };

  // 댓글 찾기
  findCmtById = async (commentId) => {
    const findCmt = await Comments.findOne({ where: { commentId } });

    return findCmt;
  };
}

module.exports = CommentRepository;