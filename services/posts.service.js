
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
        totalLike: post.totalLike
      };
    });
  };

  // 게시글 상세조회
  findPostById = async (postId) => {
    console.log(postId)
    const findPost = await this.postRepository.findPostById(postId);
    console.log(findPost)
    return {
      postId: findPost.postId,
      id: findPost.id,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      totalLike:findPost.totalLike,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
  };

  // 게시글 생성
  createPost = async (id, image, nickname, title, content) => {
    const createPostData = await this.postRepository.createPost(
      id,
      image,
      nickname,
      title,
      content
    );

    return {
      postId: createPostData.postId,
      id: createPostData.id,
      nickname: createPostData.nickname,
      image: createPostData.image,
      title: createPostData.title,
      content: createPostData.content,
      totalLike:createPostData.totalLike,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };


  // 게시글 수정
  updatePost = async (postId, nickname, image, title, content) => {
    const findPost = await this.postRepository.findPostById(postId);

    if(!findPost){ return {data : '게시글이 존재하지 않습니다'}}
    if( nickname === findPost.nickname){
    await this.postRepository.updatePost(postId, nickname, image, title, content);
    
    const updatePost = await this.postRepository.findPostById(postId);

    return {
      postId: updatePost.postId,
      nickname: updatePost.nickname,
      image: updatePost.image,
      title: updatePost.title,
      content: updatePost.content,
      totalLike:updatePost.totalLike,
      createdAt: updatePost.createdAt,
      updatedAt: updatePost.updatedAt,
    };
    }else{
      throw new Error("수정 권한이 없습니다.");
    }
  };

  // 게시글 삭제
  deletePost = async (postId, nickname) => {
    const findPost = await this.postRepository.findPostById(postId);
    if( nickname === findPost.nickname){

    await this.postRepository.deletePost(postId, nickname);

    return { message : '게시글이 삭제되었습니다.'}   ;
    }else{
      throw new Error("삭제 권한이 없습니다.");
    }
  };

  getLikePosts = async ({ id }) => {
    const getLikePostsAll = await this.postRepository.getLikePosts({ id})
   
    if (getLikePostsAll) {
        getLikePostsAll.sort((a, b) => {
            return b.totalLike - a.totalLike;
        })

        return getLikePostsAll.map((post) => {
            return {
                postId: post.postId,
                id: post.id,
                nickname: post.nickname,
                image: post.image,
                title: post.title,
                totalLike :post.totalLike,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            }
        })   
    } else {
        throw new Error ('좋아요를 누른 게시글이 존재 하지않습니다.')
    }
}

putLike = async({postId, id}) => {

    const likeLog = await this.postRepository.findLikeLog({postId, id});

    if (!likeLog) {

        await this.postRepository.increaseLike({postId, id});
        return {"increase" :true, message: "해당 게시글에 좋아요를 눌렀습니다."}
        
    } else if (likeLog) {

        await this.postRepository.decreaseLike({postId, id});
        return {"decrease": true, message: "해당 게시글에 좋아요를 취소하였습니다."}
        
    } else {
        throw new Error ("좋아요 반영에 실패하였습니다.")
    }
}
}

module.exports = PostService;
