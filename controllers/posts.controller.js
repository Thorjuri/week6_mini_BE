const PostsService = require('../services/posts.service')

class PostsController {

    postsService = new PostsService();

    getLikePosts = async (req, res, next) => {
        const { id } = res.locals.Users;
        try{
            const getLikePostsAll = await this.postsService.getLikePosts({id})
            res.status(200).json({data: getLikePostsAll})
        } catch(err) {
            res.status(404).json({error: error.message})
        }
    }

    putLike = async (req, res, next) => {
        const { postId } = req.params;
        const { id } = res.locals.Users;

        try{
            const LikePost = await this.postsService.putLike({postId, id})
            res.status(200).json(LikePost)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }
}


module.exports = PostsController