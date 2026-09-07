import api from "./axios";


export const toggleReaction = async ({
  postId,
  type
}) => {

  const response = await api.post(
    `/posts/${postId}/reaction`,
    {
      type
    }
  );


  return response.data;

};



export const getReactionCounts = async (
  postId
) => {

  const response = await api.get(
    `/reaction/${postId}/counts?targetType=post`
  );


  return response.data;

};