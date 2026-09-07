const authService = require("../services/auth.service");
const {
  successResponse,
  errorResponse
} = require("../utils/apiResponse");


const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body || {};

    if (!name || !email || !password) {
      return errorResponse(res, 400, "Validation failed");
    }


    const result = await authService.register({
      name,
      email,
      password
    });


    return successResponse(
      res,
      201,
      result,
      "User registered successfully"
    );


  } catch (error) {

    return errorResponse(
      res,
      error.message === "Email already exists" ? 400 : 500,
      error.message === "Email already exists"
        ? error.message
        : "Internal server error"
    );

  }
};



const login = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body || {};

    if (!email || !password) {
      return errorResponse(res, 400, "Validation failed");
    }


    const result = await authService.login({
      email,
      password
    });


    return successResponse(
      res,
      200,
      result,
      "Login successful"
    );


  } catch (error) {

    return errorResponse(
      res,
      error.message === "Invalid email or password" ? 401 : 500,
      error.message === "Invalid email or password"
        ? error.message
        : "Internal server error"
    );

  }
};



module.exports = {
  register,
  login
};