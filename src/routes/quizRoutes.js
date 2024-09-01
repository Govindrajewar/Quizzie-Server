const express = require("express");
const { createQuiz } = require("../controllers/quizController.js");

const router = express.Router();

router.post("/createQuiz", createQuiz);

module.exports = router;
