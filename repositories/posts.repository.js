const { Posts } = require('../models');
const { Users } = require('../models');

class PostRepository {
  findAllPost = async () => {
    const posts = await Posts.findAll();

    return posts;
  };

  findPostById = async (postId) => {
    const post = await Posts.findByPk(postId);

    return post;
  };

  findUserById = async (id) => {
    const users = await Users.findByPk(id);

    return users;
  };

  findUserByNickname = async (nickname) => {
    const user = await Users.findByPk(nickname);

    return user;
  };


  createPost = async (id, nickname, title, content, totaLike) => {
    const createPostData = await Posts.create({
      id,
      nickname,
      title,
      content,
      totaLike
    });

    return createPostData;
  };

  updatePost = async (id, nickname, title, content, totaLike) => {
    const updatePostData = await Posts.update(
      { title, content },
      { where: { id, nickname } }
    );

    return updatePostData;
  };

  deletePost = async (id) => {
    const updatePostData = await Posts.destroy({ where: { id } });

    return updatePostData;
  };

};

module.exports = PostRepository;