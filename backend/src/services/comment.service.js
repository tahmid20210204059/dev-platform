const commentModel = require("../models/comment.model");

const buildCommentTree = (comments, parentId = null) => {
  return comments
    .filter((comment) => comment.parent_comment_id === parentId)
    .sort(
      (a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
    )
    .map((comment) => ({
      id: comment.id,
      post_id: comment.post_id,
      author_id: comment.author_id,
      author_name: comment.author_name,
      body: comment.body,
      created_at: comment.created_at,
      replies: buildCommentTree(
        comments,
        comment.id
      )
    }));
};


const createComment = async ({
  postId,
  authorId,
  body,
  parentCommentId
}) => {
  return await commentModel.createComment({
    postId,
    authorId,
    body,
    parentCommentId
  });
};


const getComments = async (postId) => {
  const comments =
    await commentModel.getCommentsByPostId(postId);

  return buildCommentTree(comments);
};


const replyComment = async ({
  commentId,
  authorId,
  body
}) => {
  const parent =
    await commentModel.getCommentById(commentId);

  if (!parent) {
    throw new Error("Comment not found");
  }

  return await commentModel.createComment({
    postId: parent.post_id,
    authorId,
    body,
    parentCommentId: commentId
  });
};


module.exports = {
  createComment,
  getComments,
  replyComment
};