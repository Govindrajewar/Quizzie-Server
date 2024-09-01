// src/controllers/quizController.js

const Quiz = require("../models/Quiz.js");

const createQuiz = async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createQuiz };
