import api from "./axios";



export const getProfile = async (userId) => {

  const response = await api.get(
    `/profile/${userId}`
  );

  return response.data;

};



export const createProfile = async (data) => {

  const response = await api.post(
    "/profile",
    data
  );

  return response.data;

};



export const updateProfile = async (data) => {

  const response = await api.put(
    "/profile",
    data
  );

  return response.data;

};