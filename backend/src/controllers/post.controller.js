const postService = require("../services/post.service");

const createPost = async (req, res) => {
  try {
    const { title, body } = req.body;

    const post = await postService.createPost({
      authorId: req.user.id,
      title,
      body
    });

    res.status(201).json({
      success: true,
      data: post,
      message: "Post created successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();

    res.status(200).json({
      success: true,
      data: posts,
      message: "Posts fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);

    res.status(200).json({
      success: true,
      data: post,
      message: "Post fetched successfully"
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost
};