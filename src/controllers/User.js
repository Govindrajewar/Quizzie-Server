const bcrypt = require("bcrypt");
const User = require("../models/User.js");
var jwt = require("jsonwebtoken");

const userAction = async (req, res) => {
  try {
    const { name, email, password, action } = req.body;

    if (action === "signup") {
      // Handle signup logic
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: encryptedPassword,
      });
      await user.save();

      res.status(201).json({
        status: "SUCCESS",
        message: "User signed up successfully",
      });
    } else if (action === "login") {
      // Handle login logic
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          status: "ERROR",
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          status: "ERROR",
          message: "Invalid email or password",
        });
      }

      // Create a token (optional)
      const token = jwt.sign({ userId: user._id }, "your_secret_key", {
        expiresIn: "1h",
      });

      res.status(200).json({
        status: "SUCCESS",
        message: "User logged in successfully",
        token,
      });
    } else {
      res.status(400).json({
        status: "ERROR",
        message: "Invalid action",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

module.exports = {
  userAction,
};
