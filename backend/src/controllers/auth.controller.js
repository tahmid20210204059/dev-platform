const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await authService.register({
      name,
      email,
      password
    });

    res.status(201).json({
      success: true,
      data: result,
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login({
      email,
      password
    });

    res.status(200).json({
      success: true,
      data: result,
      message: "Login successful"
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  register,
  login
};