
const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  quizId: {
    type: String,
    required: true,
    unique: true,
  },
  quizName: {
    type: String,
    required: true,
  },
  quizType: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: String,
      optionType: String,
      answerOptions: [String],
      correctAnswer: Number,
      timer: String,
    },
  ],
  createdBy: {
    type: String,
    required: true,
  },
  createdOn: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("QuizData", QuizSchema);
