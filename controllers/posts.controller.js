const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();

  // 게시글 전체 조회
  getPosts = async (req, res) => {
    const posts = await this.postService.findAllPost();

    res.status(200).json({ data: posts });
  };

  // 게시글 상세조회
  getPostById = async (req, res) => {
    const { postId } = req.params;
    const post = await this.postService.findPostById(postId);

    
    res.status(200).json({ data: post });
    
  };
  
  // 게시글 작성
  createPost = async (req, res) => {
    const {id, nickname} = req.locals;
    const {title, content} = req.body;
    const createPostData = await this.postService.createPost(
      id,
      nickname,
      title,
      content
    );
    
    try{
    res.status(201).json({ data: createPostData });
    console.log('게시글 작성 성공');
    }catch{
        console.log('게시글 작성 실패');
    }
  };

  // 게시글 수정
  updatePost = async (req, res) => {
    const { id, nickname } = req.locals;
    const { title, content } = req.body;

    const updatePost = await this.postService.updatePost(
      id,
      nickname,
      title,
      content
    );
    
    try{
    res.status(200).json({ data: updatePost });
    console.log('게시글 수정 성공');
    }catch{
    console.log('게시글 수정 실패');
    }
  };

  //게시글 삭제
  deletePost = async (req, res) => {
    const { id } = req.locals;

    const deletePost = await this.postService.deletePost(id);


    try{
    res.status(200).json({ data: deletePost });
    console.log('게시글 삭제 성공');
    }catch{
        console.log('게시글 삭제 실패');
    }
  };
}

module.exports = PostsController;