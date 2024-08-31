const express = require("express");
const quizController = require("../controllers/quizController");
const { isAuthenticatedUser } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", isAuthenticatedUser, quizController.createQuiz);
router.get("/play/:quizId", quizController.getQuizDetailsById);
router.get("/result/:quizId", quizController.getQuizDetailsById);
router.get("/all-quizzes", isAuthenticatedUser, quizController.getAllQuizzes);
router.put("/edit/:quizId", isAuthenticatedUser, quizController.updateQuizDetailsById);
router.delete("/delete/:quizId", isAuthenticatedUser, quizController.deleteQuizById);
router.post("/answerCounts", quizController.answerCounts);
router.post("/optionSubmit", quizController.selectedOptionCounts);

module.exports = router;
