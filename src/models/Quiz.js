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
      answerOptions: [
        {
          text: { type: String, default: null },
          image: { type: String, default: null }
        }
      ],
      correctAnswer: Number,
      timer: String,
      answeredCorrectly: { type: Number, default: 0 },
      answerOptionCount: { type: [Number], default: [] },
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
  impressions: { type: Number, default: 0 },
});

module.exports = mongoose.model("QuizData", QuizSchema);
