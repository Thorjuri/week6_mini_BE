const PostsRepository = require('../repositories/posts.repository')

class PostsService {

    postsRepository = new PostsRepository();

    getLikePosts = async ({ id }) => {
        const getLikePostsAll = await this.postsRepository.getLikePosts({id})
       
        if (getLikePostsAll) {
            getLikePostsAll.sort((a, b) => {
                return b.totalLike - a.totalLike;
            })

            return getLikePostsAll.map((post) => {
                return {
                    postId: post.postId,
                    id: post.id,
                    nickname: post.nickname,
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