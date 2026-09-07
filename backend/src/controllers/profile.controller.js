const profileService = require("../services/profile.service");
const {
  successResponse,
  errorResponse
} = require("../utils/apiResponse");


const createProfile = async (req, res) => {
  try {

    const {
      bio,
      skills,
      experiences
    } = req.body || {};

    if (
      (skills !== undefined && !Array.isArray(skills)) ||
      (experiences !== undefined && !Array.isArray(experiences))
    ) {
      return errorResponse(res, 400, "Validation failed");
    }


    const profile =
      await profileService.createProfile({
        userId: req.user.id,
        bio,
        skills,
        experiences
      });


    return successResponse(
      res,
      201,
      profile,
      "Profile created successfully"
    );


  } catch (error) {

    return errorResponse(
      res,
      error.message === "Profile not found" ? 404 : 500,
      error.message === "Profile not found"
        ? error.message
        : "Internal server error"
    );

  }
};



const updateProfile = async (req, res) => {
  try {

    const {
      bio,
      skills,
      experiences
    } = req.body || {};

    if (
      (skills !== undefined && !Array.isArray(skills)) ||
      (experiences !== undefined && !Array.isArray(experiences))
    ) {
      return errorResponse(res, 400, "Validation failed");
    }


    const profile =
      await profileService.updateProfile({
        userId: req.user.id,
        bio,
        skills,
        experiences
      });


    return successResponse(
      res,
      200,
      profile,
      "Profile updated successfully"
    );


  } catch (error) {

    return errorResponse(
      res,
      500,
      "Internal server error"
    );

  }
};



const getProfile = async (req, res) => {
  try {

    const profile =
      await profileService.getProfile(
        req.params.userId
      );


    return successResponse(
      res,
      200,
      profile,
      "Profile fetched successfully"
    );


  } catch (error) {

    return errorResponse(
      res,
      error.message === "Profile not found" ? 404 : 500,
      error.message === "Profile not found"
        ? error.message
        : "Internal server error"
    );

  }
};



module.exports = {
  createProfile,
  updateProfile,
  getProfile
};