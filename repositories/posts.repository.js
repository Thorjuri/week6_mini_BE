const { Likes } = require('../models')
const { Posts } = require('../models')
 

class PostsRepository {

    getLikePosts = async ({ id }) => {
        const getLikeAll = await Likes.findAll({
            where: { id },
            attributes: ['postId'],
        });

        const postLikeNumber = getLikeAll.map((post) => {
            return post.getDataValue('postId')});

        console.log(postLikeNumber);

        const getLikePostsAll = await Posts.findAll({
            where: { postId: postLikeNumber },
        });

        return getLikePostsAll;
    };

    findLikeLog = async ({postId, id}) => {
        const userLikePost = await Likes.findOne({ where: { postId, id } })

        return userLikePost;
    }

    increaseLike = async ({postId, id}) => {
        await Likes.create({postId, id})
        await Posts.increment({ totalLike: 1 }, { where: { postId } })

        return ({});
    };

    decreaseLike = async ({postId, id}) => {
        await Likes.destroy({where: {postId, id}})
        await Posts.decrement({ totalLike: 1 }, { where: { postId } })

        return ({});
    };

}

module.exports = PostsRepository