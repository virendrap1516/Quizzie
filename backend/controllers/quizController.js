const Quiz = require("../models/quizModel");
const User = require("../models/userModel");

// Create a new quiz
const createQuiz = async (req, res, next) => {
  try {
    const { quizType, quizName, slides } = req.body;
    if (!quizType.trim() || !quizName.trim() || !slides) {
      return res
        .status(400)
        .json({ errorMessage: "Please fill all the required fields" });
    }
    const quizData = {
      quizType: quizType.trim(),
      quizName: quizName.trim(),
      slides,
      createdBy: req.user.id,
    };
    const quiz = new Quiz(quizData);
    await quiz.save();
    res.status(201).json({ success: true, quiz, quizId: quiz.id });
  } catch (error) {
    next(error);
  }
};

// Get a quiz details
const getQuizDetailsById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ errorMessage: "Quiz not found" });
    }
    if (req.path.includes("/play")) {
      quiz.impression += 1;
      await quiz.save();
    }
    return res.status(200).json({ success: true, quiz });
  } catch (error) {
    next(error);
  }
};

// Get all user quizzes
const getAllQuizzes = async (req, res, next) => {
  try {
    const { userId, filterByImpression } = req.query;
    let quizzes;
    if (filterByImpression === "true") {
      quizzes = await Quiz.find({
        createdBy: userId,
        impression: { $gt: 10 },
      }).sort({ impression: -1 });
    } else {
      quizzes = await Quiz.find({
        createdBy: userId,
      }).sort({ createdAt: 1 });
    }
    return res.status(200).json({
      success: true,
      quizzes,
    });
  } catch (error) {
    next(error);
  }
};

// Update a quiz
const updateQuizDetailsById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ errorMessage: "Quiz not found" });
    }
    const createdBy = req.user.id;
    const { quizType, quizName, slides } = req.body;
    if (!quizType.trim() || !quizName.trim() || !slides || !createdBy) {
      return res
        .status(400)
        .json({ errorMessage: "Please fill all the required fields" });
    }
    const quizData = {
      quizType: quizType.trim(),
      quizName: quizName.trim(),
      slides,
    };
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.quizId,
      quizData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({ success: true, quiz: updatedQuiz, quizId: quiz.id });
  } catch (error) {
    next(error);
  }
};

// Delete a quiz
const deleteQuizById = async (req, res, next) => {
  try {
    const quizId = req.params.quizId;
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({
        errorMessage: "Quiz Not Found",
      });
    }
    res.json({ message: "Quiz Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

// Update answer counts
const answerCounts = async (req, res, next) => {
  try {
    const { quizId, slideIndex, isCorrect } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ errorMessage: "Quiz not found" });
    }

    if (slideIndex < 0 || slideIndex >= quiz.slides.length) {
      return res.status(400).json({ errorMessage: "Invalid slide index" });
    }

    const slide = quiz.slides[slideIndex];
    if (isCorrect) {
      slide.correctAnswerCount += 1;
    } else {
      slide.wrongAnswerCount += 1;
    }

    await quiz.save();
    res.status(200).json({ success: true, slide });
  } catch (error) {
    next(error);
  }
};

// count selected option
const selectedOptionCounts = async (req, res, next) => {
  try {
    const { quizId, slideIndex, selectedOption } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ errorMessage: "Quiz not found" });
    }
    const slide = quiz.slides[slideIndex];
    if (!slide) {
      return res.status(404).json({ errorMessage: "Slide not found" });
    }
    const option = slide.options.find(
      (option) =>
        option.text === selectedOption || option.imageUrl === selectedOption
    );
    if (!option) {
      return res.status(404).json({ message: "Option not found" });
    }

    option.selectionCount = (option.selectionCount || 0) + 1;
    await quiz.save();
    res.json({ msg: "Answer submitted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuiz,
  getQuizDetailsById,
  getAllQuizzes,
  updateQuizDetailsById,
  deleteQuizById,
  answerCounts,
  selectedOptionCounts,
};
