const express = require("express");
const {
  createQuiz,
  getQuizById,
  getQuizData,
  deleteQuizById,
  updateImpressionCount,
} = require("../controllers/quizController.js");

const router = express.Router();

router.post("/createQuiz", createQuiz);
router.get("/quizData", getQuizData);
router.get("/quiz/:quizId", getQuizById);
router.delete("/quiz/:quizId", deleteQuizById);
router.put("/quiz/:quizId/impressions", updateImpressionCount);

module.exports = router;
