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

// function to fetch Quiz by Id
const getQuizById = async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await Quiz.findById( quizId );
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function to fetch all Quiz
const getQuizData = async (req, res) => {
  try {
    const data = await Quiz.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
};

// Function to delete Quiz by Id
const deleteQuizById = async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function to increase impression count
const updateImpressionCount = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    quiz.impressions = (quiz.impressions || 0) + 1;
    await quiz.save();

    res.status(200).json({ message: "Impressions updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update impressions" });
  }
};

module.exports = {
  createQuiz,
  getQuizById,
  getQuizData,
  deleteQuizById,
  updateImpressionCount,
};
