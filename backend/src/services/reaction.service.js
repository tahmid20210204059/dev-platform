const reactionModel = require("../models/reaction.model");


const toggleReaction = async ({
  userId,
  targetType,
  targetId,
  type
}) => {

  if (!["like", "dislike"].includes(type)) {
    throw new Error("Invalid reaction type");
  }


  if (!["post", "comment"].includes(targetType)) {
    throw new Error("Invalid target type");
  }

  const targetExists = await reactionModel.targetExists({
    targetType,
    targetId
  });

  if (!targetExists) {
    const error = new Error("Target not found");
    error.statusCode = 404;
    throw error;
  }


  return await reactionModel.toggleReaction({
    userId,
    targetType,
    targetId,
    type
  });
};



const getReactionCounts = async ({
  targetType,
  targetId
}) => {

  return await reactionModel.getReactionCounts({
    targetType,
    targetId
  });
};



const getUserReaction = async ({
  userId,
  targetType,
  targetId
}) => {

  return await reactionModel.getUserReaction({
    userId,
    targetType,
    targetId
  });
};



module.exports = {
  toggleReaction,
  getReactionCounts,
  getUserReaction
};