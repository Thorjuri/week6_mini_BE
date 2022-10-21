const PostsRepository = require('../services/posts.service')

class PostsService {

    postsRepository = new PostsRepository();

    getLikePosts = async ({id}) => {
        const getLikePostsAll = await this.postsRepository.getLikePosts({id})
       
        getLikePostsAll.sort((a, b) => {
            return b.totalLikes - a.totalLikes;
        })

        return getLikePostsAll.map((post) => {
            return {
                postId: post.postId,
                id: post.id,
                nickname: post.nickname,
                title: post.title,
                totalLikes :post.totalLikes,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            }
        })   
    }

    putLike = async({postId, id}) => {

        const likeLog = await this.postsRepository.findLikeLog({postId, id});

        if (!likeLog) {

            await this.postsRepository.increaseLike({postId, id});
            return {"increase" :true, message: "해당 게시글에 좋아요를 눌렀습니다."}
            
        } else if (likeLog) {

            await this.postsRepository.decreaseLike({postId, id});
            return {"decrease": true, message: "해당 게시글에 좋아요를 취소하였습니다."}
            
        } else {
            throw new Error ("좋아요 반영에 실패하였습니다.")
        }
    }
}

module.exports = PostsService