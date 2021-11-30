const express = require("express");
const router = express.Router();

const {
  getQuizById,
  createQuiz,
  getQuiz,
  getAllPublicQuizes,
  getQuizByUser,
  updateQuiz,
  deleteQuiz,
  blockUnblockQuiz,
  publicPrivateQuiz,
} = require("../controllers/quiz");
const { getUserById } = require("../controllers/user");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
  isNotBlocked,
} = require("../middlewares/auth");

router.param("quizId", getQuizById);
router.param("userId", getUserById);

router.post(
  "/quiz/:userId",
  isSignedIn,
  isAuthenticated,
  isNotBlocked,
  createQuiz
);

router.get("/quiz/:quizId", getQuiz);
router.get("/quizes", getAllPublicQuizes);
router.get("/quizes/:userId", getQuizByUser);

router.put(
  "/quiz/:quizId/:userId",
  isSignedIn,
  isAuthenticated,
  isNotBlocked,
  updateQuiz
);
router.delete(
  "/quiz/:quizId/:userId",
  isSignedIn,
  isAuthenticated,
  isNotBlocked,
  deleteQuiz
);

router.put(
  "/quiz/block/:quizId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  blockUnblockQuiz
);
router.put(
  "/quiz/public/:quizId/:userId",
  isSignedIn,
  isAuthenticated,
  publicPrivateQuiz
);

module.exports = router;
