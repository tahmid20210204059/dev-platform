const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const { generateToken } = require("../utils/jwt");

const register = async ({ name, email, password }) => {
  const existingUser = await userModel.findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await userModel.createUser({
    name,
    email,
    passwordHash
  });

  const token = generateToken({
    id: user.id,
    email: user.email
  });

  return {
    user,
    token
  };
};

const login = async ({ email, password }) => {
  const user = await userModel.findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    id: user.id,
    email: user.email
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    token
  };
};

module.exports = {
  register,
  login
};