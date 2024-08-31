const express = require("express");
const router = express.Router();

const { userAction } = require("../controllers/User.js");

router.post("/", userAction);

module.exports = router;
