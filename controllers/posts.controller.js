const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();

  // 게시글 전체 조회
  getPosts = async (req, res) => {
    
    try{
      const posts = await this.postService.findAllPost();
      res.status(200).json({ data: posts });
    }catch{
      res.status(404).json({error: error.message})
    }
  };

  // 게시글 상세조회
  getPostById = async (req, res) => {
    const { postId } = req.params;
    
    try{
    const post = await this.postService.findPostById(postId);
    res.status(200).json({ data: post });
    }catch{
      res.status(404).json({error: error.message})
    }
    
  };
  
  // 게시글 작성
  createPost = async (req, res) => {
    const {id, nickname} = res.locals.Users;
    const {title, content} = req.body;

    try{
    const createPostData = await this.postService.createPost(
      id,
      nickname,
      title,
      content
    );
    res.status(201).json({ data: createPostData });
  }catch{
    res.status(404).json({error: error.message});
  }
    
    
  };

  // 게시글 수정
  updatePost = async (req, res) => {
    const { id, nickname } = res.locals.Users;
    const { title, content } = req.body;
    const { postId } = req.params.postId;

    try{
    const updatePost = await this.postService.updatePost(
      id,
      nickname,
      title,
      content,
      postId
    );
    res.status(200).json({ data: updatePost });
    }catch{
      res.status(404).json({error: error.message});
    }
    
    
  };

  //게시글 삭제
  deletePost = async (req, res) => {
    const { id } = res.locals.Users;
    const { postId } = req.params.postId;

    try{
    const deletePost = await this.postService.deletePost(
      id,
      postId
      );
    res.status(200).json({ data: deletePost });
    }catch{
      res.status(404).json({error: error.message});
    }
   
    
  };
}

module.exports = PostsController;