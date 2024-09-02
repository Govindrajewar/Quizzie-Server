const express = require("express");
const {
  createQuiz,
  getQuizById,
  getQuizData,
} = require("../controllers/quizController.js");

const router = express.Router();

router.post("/createQuiz", createQuiz);
router.get("/quizData", getQuizData);
router.get("/quiz/:quizId", getQuizById);

module.exports = router;
