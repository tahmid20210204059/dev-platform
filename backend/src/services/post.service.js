const postModel = require("../models/post.model");

const createPost = async ({ authorId, title, body }) => {
  return await postModel.createPost({
    authorId,
    title,
    body
  });
};

const getAllPosts = async () => {
  return await postModel.getAllPosts();
};

const getPostById = async (id) => {
  const post = await postModel.getPostById(id);

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById
};