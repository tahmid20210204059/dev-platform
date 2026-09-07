import api from "./axios";



export const getPosts = async () => {

  const response = await api.get(
    "/posts"
  );

  return response.data;

};




export const getPost = async (id) => {

  const response = await api.get(
    `/posts/${id}`
  );

  return response.data;

};




export const createPost = async (formData) => {

  const response = await api.post(

    "/posts",

    formData,

    {
      headers:{
        "Content-Type":"multipart/form-data"
      }
    }

  );


  return response.data;

};