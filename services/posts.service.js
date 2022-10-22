const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();
  
  // 게시글 조회
  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();

    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allPost.map((post) => {
      return {
        postId: post.postId,
        id: post.id,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        totaLike: post.totaLikes
      };
    });
  };

  // 게시글 상세조회
  findPostById = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);

    return {
      postId: findPost.postId,
      id: findPost.id,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      totaLike:findPost.totaLikes,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
  };

  // 게시글 생성
  createPost = async (userId, nickname,title, content) => {
    const createPostData = await this.postRepository.createPost(
      userId,
      nickname,
      title,
      content
    );

    return {
      postId: createPostData.postId,
      id: createPostData.id,
      nickname: createPostData.nickname,
      title: createPostData.title,
      content: createPostData.content,
      totaLike:createPostData.totaLikes,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };


  // 게시글 수정
  updatePost = async (userId, nickname, title, content) => {
    const findPost = await this.postRepository.findPostById(postId);
    const findUser = await this.postRepository.findUserInfo(userId);
    
    if( postId === findPost.postId && userId === findUser.userId){
    await this.postRepository.updatePost(id, nickname, title, content);
    
    const updatePost = await this.postRepository.findPostById(postId);

    return {
      postId: updatePost.postId,
      id: updatePost.id,
      nickname: updatePost.nickname,
      title: updatePost.title,
      content: updatePost.content,
      totaLike:updatePost.totaLikes,
      createdAt: updatePost.createdAt,
      updatedAt: updatePost.updatedAt,
    };
    }else{
      throw new Error("수정 권한이 없습니다.");
    }
  };

  // 게시글 삭제
  deletePost = async (id) => {
    const findPost = await this.postRepository.findPostById(postId);
    if( id === findPost.id){

    await this.postRepository.deletePost(id);

    return {
      postId: findPost.postId,
      id: findPost.id,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      totaLike:findPost.totaLikes,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
    }else{
      throw new Error("삭제 권한이 없습니다.");
    }
  };
}

module.exports = PostService;