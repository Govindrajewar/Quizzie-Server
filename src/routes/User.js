const express = require("express");
const router = express.Router();

const { signupUser } = require("../controllers/User.js");

router.post("/", signupUser);

module.exports = router;
