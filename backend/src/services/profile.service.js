const profileModel = require("../models/profile.model");

const createProfile = async ({
  userId,
  bio,
  skills,
  experiences
}) => {
  return await profileModel.createProfile({
    userId,
    bio,
    skills,
    experiences
  });
};


const updateProfile = async ({
  userId,
  bio,
  skills,
  experiences
}) => {
  const profile = await profileModel.updateProfile({
    userId,
    bio,
    skills,
    experiences
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile;
};


const getProfile = async (userId) => {
  const profile =
    await profileModel.getProfileByUserId(userId);

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile;
};


module.exports = {
  createProfile,
  updateProfile,
  getProfile
};