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

// Function to update the answeredCorrectly count for a specific question
const updateAnsweredCorrectly = async (req, res) => {
  try {
    const { quizId, questionIndex } = req.params;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (questionIndex >= quiz.questions.length || questionIndex < 0) {
      return res.status(400).json({ message: "Invalid question index" });
    }

    quiz.questions[questionIndex].answeredCorrectly += 1;
    await quiz.save();

    res
      .status(200)
      .json({ message: "AnsweredCorrectly count updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update answeredCorrectly count" });
  }
};

// Function to update answerOptionCount for a specific option
const updateAnswerOptionCount = async (req, res) => {
  try {
    const { quizId, questionIndex, optionIndex } = req.params;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const question = quiz.questions[questionIndex];

    if (!question || optionIndex >= question.answerOptions.length) {
      return res.status(400).json({ message: "Invalid question or option index" });
    }

    if (!question.answerOptionCount || question.answerOptionCount.length !== question.answerOptions.length) {
      question.answerOptionCount = Array(question.answerOptions.length).fill(0);
    }

    // Increment the selected option's count
    question.answerOptionCount[optionIndex] += 1;

    await quiz.save();

    res.status(200).json({ message: "Answer option count updated successfully", updatedQuestion: question });
  } catch (error) {
    console.error("Error updating answer option count:", error);
    res.status(500).json({ error: "Failed to update answer option count" });
  }
};


// function to check Quiz Id
const checkQuizId = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ quizId: req.params.quizId });
    if (quiz) {
      return res.json({ exists: true });
    }
    return res.json({ exists: false });
  } catch (error) {
    console.error("Error checking quizId:", error);
    return res.status(500).send("Server error");
  }
};

module.exports = {
  createQuiz,
  getQuizById,
  getQuizData,
  deleteQuizById,
  updateImpressionCount,
  updateAnsweredCorrectly,
  updateAnswerOptionCount, // Exporting new function
  checkQuizId,
};
