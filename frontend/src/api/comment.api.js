import api from "./axios";



export const getComments = async(postId)=>{

  const response = await api.get(

    `/posts/${postId}/comments`

  );


  return response.data;

};





export const createComment = async(postId, body)=>{


  const response = await api.post(

    `/posts/${postId}/comments`,

    {
      body
    }

  );


  return response.data;

};


export const replyComment = async(commentId, body)=>{

  const response = await api.post(
    `/comments/${commentId}/replies`,
    {
      body
    }
  );

  return response.data;

};