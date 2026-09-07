const commentService = require("../services/comment.service");
const {
  successResponse,
  errorResponse
} = require("../utils/apiResponse");


const createComment = async (req, res) => {
  try {

    const {
      body
    } = req.body || {};

    if (!body) {
      return errorResponse(res, 400, "Validation failed");
    }


    const comment =
      await commentService.createComment({
        postId: req.params.id,
        authorId: req.user.id,
        body
      });


    return successResponse(
      res,
      201,
      comment,
      "Comment created successfully"
    );


  } catch (error) {

    return errorResponse(
      res,
      500,
      "Internal server error"
    );

  }
};



const getComments = async (req, res) => {
  try {

    const comments =
      await commentService.getComments(
        req.params.id
      );


    return successResponse(
      res,
      200,
      comments,
      "Comments fetched successfully"
    );


  } catch (error) {

    return errorResponse(
      res,
      500,
      "Internal server error"
    );

  }
};



const replyComment = async (req, res) => {
  try {

    const {
      body
    } = req.body || {};

    if (!body) {
      return errorResponse(res, 400, "Validation failed");
    }


    const reply =
      await commentService.replyComment({
        commentId: req.params.id,
        authorId: req.user.id,
        body
      });


    return successResponse(
      res,
      201,
      reply,
      "Reply created successfully"
    );


  } catch (error) {

    return errorResponse(
      res,
      500,
      "Internal server error"
    );

  }
};



module.exports = {
  createComment,
  getComments,
  replyComment
};