const express = require("express");
const {
  createQuiz,
  getQuizById,
  getQuizData,
  deleteQuizById,
} = require("../controllers/quizController.js");

const router = express.Router();

router.post("/createQuiz", createQuiz);
router.get("/quizData", getQuizData);
router.get("/quiz/:quizId", getQuizById);
router.delete("/quiz/:quizId", deleteQuizById);  // Added DELETE route

module.exports = router;
