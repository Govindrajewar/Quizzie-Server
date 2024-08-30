const bcrypt = require("bcrypt");
const User = require("../models/User.js");
var jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    res.status(201).json({
      status: "SUCCESS",
      message: "User Signed Up successfully",
    });
  } catch (error) {
    res.json({
      status: "ERROR",
      message: error.message,
    });
  }
};

module.exports = {
  signupUser,
};
