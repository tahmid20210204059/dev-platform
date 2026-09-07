const commentService = require("../services/comment.service");

const createComment = async (req, res) => {
  try {
    const { body } = req.body;

    const comment = await commentService.createComment({
      postId: req.params.id,
      authorId: req.user.id,
      body
    });

    res.status(201).json({
      success: true,
      data: comment,
      message: "Comment created successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getComments = async (req, res) => {
  try {
    const comments =
      await commentService.getComments(req.params.id);

    res.status(200).json({
      success: true,
      data: comments,
      message: "Comments fetched successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const replyComment = async (req, res) => {
  try {
    const { body } = req.body;

    const reply =
      await commentService.replyComment({
        commentId: req.params.id,
        authorId: req.user.id,
        body
      });

    res.status(201).json({
      success: true,
      data: reply,
      message: "Reply created successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  createComment,
  getComments,
  replyComment
};