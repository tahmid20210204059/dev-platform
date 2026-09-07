const reactionService = require("../services/reaction.service");
const {
  successResponse,
  errorResponse
} = require("../utils/apiResponse");


const toggleReaction = async (req, res) => {
  try {

    const { type } = req.body || {};

    if (!["like", "dislike"].includes(type)) {
      return errorResponse(res, 400, "Validation failed");
    }


    const result =
      await reactionService.toggleReaction({
        userId: req.user.id,
        targetType: req.reactionTargetType,
        targetId: req.params.id,
        type
      });


    return successResponse(
      res,
      200,
      result,
      result.removed
        ? "Reaction removed successfully"
        : "Reaction added successfully"
    );


  } catch (error) {

    return errorResponse(
      res,
      error.statusCode || 500,
      error.statusCode === 404
        ? error.message
        : "Internal server error"
    );

  }
};



const getReactionCounts = async (req, res) => {
  try {

    const {
      targetType
    } = req.query;

    if (!["post", "comment"].includes(targetType)) {
      return errorResponse(res, 400, "Validation failed");
    }


    const counts =
      await reactionService.getReactionCounts({
        targetType,
        targetId: req.params.id
      });


    return successResponse(
      res,
      200,
      counts,
      "Reaction counts fetched successfully"
    );


  } catch (error) {

    return errorResponse(
      res,
      500,
      "Internal server error"
    );

  }
};



const getUserReaction = async (req, res) => {
  try {

    const {
      targetType
    } = req.query;

    if (!["post", "comment"].includes(targetType)) {
      return errorResponse(res, 400, "Validation failed");
    }


    const reaction =
      await reactionService.getUserReaction({
        userId: req.user.id,
        targetType,
        targetId: req.params.id
      });


    return successResponse(
      res,
      200,
      reaction || null,
      "User reaction fetched successfully"
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
  toggleReaction,
  getReactionCounts,
  getUserReaction
};