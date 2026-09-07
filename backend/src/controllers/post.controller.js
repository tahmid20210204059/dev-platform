const postService = require("../services/post.service");
const {
  successResponse,
  errorResponse
} = require("../utils/apiResponse");


const createPost = async (req, res) => {
  try {

    const {
      title,
      body
    } = req.body;


    let mediaUrl = null;
    let mediaType = null;


    if (req.file) {

      mediaUrl = `/uploads/${req.file.filename}`;

      mediaType = req.file.mimetype.startsWith("image")
        ? "image"
        : "video";
    }


    const post = await postService.createPost({
      authorId: req.user.id,
      title,
      body,
      mediaUrl,
      mediaType
    });


    return successResponse(
      res,
      201,
      post,
      "Post created successfully"
    );


  } catch (error) {

    return errorResponse(
      res,
      500,
      "Internal server error"
    );

  }
};



const getPosts = async (req, res) => {
  try {

    const posts =
      await postService.getAllPosts();


    return successResponse(
      res,
      200,
      posts,
      "Posts fetched successfully"
    );


  } catch (error) {

    return errorResponse(
      res,
      500,
      "Internal server error"
    );

  }
};



const getPost = async (req, res) => {
  try {

    const post =
      await postService.getPostById(req.params.id);


    return successResponse(
      res,
      200,
      post,
      "Post fetched successfully"
    );


  } catch (error) {

    return errorResponse(
      res,
      404,
      error.message
    );

  }
};



module.exports = {
  createPost,
  getPosts,
  getPost
};