const { Posts } = require('../models');
const { Users } = require('../models');

class PostRepository {

  // 게시글 전체 조회
  findAllPost = async () => {
    const posts = await Posts.findAll();

    return posts;
  };

  // 게시글 상제 정보
  findPostById = async (postId) => {
    const post = await Posts.findByPk(postId);

    return post;
  };

  // 유저 정보 받아오기
  findUserInfo = async (userId) =>{
    const userInfo = await Users.findOne({ where : { userId }})
    const nickname = userInfo.nickname

    return {
        id: userInfo,
        nickname: nickname
    };
  };

  // 게시글 생성
  createPost = async (postId, userId, nickname, title, content, totaLike) => {
    const createPostData = await Posts.create({
      postId,
      userId,
      nickname,
      title,
      content,
      totaLike
    });

    return createPostData;
  };

  // 게시글 수정
  updatePost = async (posdId, userId, nickname, title, content) => {
    const updatePostData = await Posts.update(
      { title, content },
      { where: { posdId, userId, nickname } }
    );

    return updatePostData;
  };

  // 게시글 삭제
  deletePost = async (postId, userId) => {
    const deletePostData = await Posts.destroy({ where: { postId, userId } });

    return deletePostData;
  };

};

module.exports = PostRepository;