const mongoose = require("mongoose");

const User = mongoose.model("QuizzieUser", {
  name: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = User;
