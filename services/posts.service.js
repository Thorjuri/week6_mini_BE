const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();

    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allPost.map((post) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        totaLike: post.totaLike
      };
    });
  };

  findUserById = async (id) =>{
    const FindUser = await this.postRepository.findUserById(id);

    return {
        id: FindUser.id
    };
  };

  findUserByNickname = async (nickname) =>{
    const FindUser = await this.postRepository.findUserByNickname(nickname);

    return {
        nickname: FindUser.nickname
    };
  };

  findPostById = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);

    return {
      postId: findPost.postId,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
  };

  createPost = async (id, nickname,title, content) => {
    const createPostData = await this.postRepository.createPost(
      id,
      nickname,
      title,
      content
    );

    return {
      postId: createPostData.id,
      nickname: createPostData.nickname,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };

  updatePost = async (id, nickname, title, content) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("게시글이 존재하지 않습니다.");

    await this.postRepository.updatePost(id, nickname, title, content);

    const updatePost = await this.postRepository.findPostById(postId);

    return {
        postId:updatePost.postId,
      nickname: updatePost.nickname,
      title: updatePost.title,
      content: updatePost.content,
      createdAt: updatePost.createdAt,
      updatedAt: updatePost.updatedAt,
    };
  };

  deletePost = async (id) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("게시글이 존재하지 않습니다.");

    await this.postRepository.deletePost(id);

    return {
      postId: findPost.postId,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
  };
}

module.exports = PostService;