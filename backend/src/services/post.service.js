const postModel = require("../models/post.model");


const createPost = async ({
  authorId,
  title,
  body,
  mediaUrl,
  mediaType
}) => {

  return await postModel.createPost({
    authorId,
    title,
    body,
    mediaUrl,
    mediaType
  });

};


const getAllPosts = async () => {

  return await postModel.getAllPosts();

};


const getPostById = async (id) => {

  return await postModel.getPostById(id);

};


module.exports = {
  createPost,
  getAllPosts,
  getPostById
};