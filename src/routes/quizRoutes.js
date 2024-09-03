const express = require("express");
const {
  createQuiz,
  getQuizById,
  getQuizData,
  deleteQuizById,
  updateImpressionCount,
  updateAnsweredCorrectly,
} = require("../controllers/quizController.js");

const router = express.Router();

router.post("/createQuiz", createQuiz);
router.get("/quizData", getQuizData);
router.get("/quiz/:quizId", getQuizById);
router.delete("/quiz/:quizId", deleteQuizById);
router.put("/quiz/:quizId/impressions", updateImpressionCount);
router.put("/quiz/:quizId/question/:questionIndex/correct", updateAnsweredCorrectly);

module.exports = router;
