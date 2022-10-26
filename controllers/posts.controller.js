const PostService = require('../services/posts.service');

class PostsController {
    postService = new PostService();

    // 게시글 전체 조회
    getPosts = async (req, res) => {
        try {
            const posts = await this.postService.findAllPost();
            res.status(200).json({ data: posts });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    };

    // 게시글 상세조회
    getPostById = async (req, res) => {
        const { postId } = req.params;
        

        try {
            const post = await this.postService.findPostById(postId);
            res.status(200).json({ data: post });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    };

    // 게시글 작성
    createPost = async (req, res) => {
        const { id, userId, nickname } = res.locals.user;
        const { title, content } = req.body;
        const fileData = req.file;
        console.log(fileData)

        try {
            const createPostData = await this.postService.createPost(
                id,
                userId,
                nickname,
                fileData,
                title,
                content
            );
            res.status(201).json({ data: createPostData });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    };

    // 게시글 수정
    updatePost = async (req, res) => {
        const { nickname } = res.locals.user;
        const { title, content } = req.body;
        const { postId } = req.params;

        try {
            const updatePost = await this.postService.updatePost(
                postId,
                nickname,
                title,
                content
            );
            res.status(200).json(updatePost);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    };

    //게시글 삭제
    deletePost = async (req, res) => {
        const { nickname } = res.locals.user;
        const { postId } = req.params;

        try {
            const deletePost = await this.postService.deletePost(
                postId,
                nickname
            );
            res.status(200).json({ data: deletePost });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    };

    getLikePosts = async (req, res, next) => {
        const { id } = res.locals.user;
        try {
            const getLikePostsAll = await this.postService.getLikePosts({ id });
            res.status(200).json({ data: getLikePostsAll });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    };

    putLike = async (req, res, next) => {
        const { postId } = req.params;
        const { id } = res.locals.user;

        try {
            const LikePost = await this.postService.putLike({ postId, id });
            res.status(200).json(LikePost);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };
}

module.exports = PostsController;
