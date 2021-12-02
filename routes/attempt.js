const express = require("express");
const router = express.Router();
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
  isNotBlocked,
} = require("../middlewares/auth");
const { getUserById } = require("../controllers/user");
const { getQuizById } = require("../controllers/quiz");
const {
  createAttempt,
  getAttemptsByUser,
  getAttemptsByQuiz,
} = require("../controllers/attempt");

router.param("quizId", getQuizById);
router.param("userId", getUserById);

router.post(
  "/attempt/:quizId/:userId",
  isSignedIn,
  isAuthenticated,
  isNotBlocked,
  createAttempt
);

router.get("/attempts/:userId", getAttemptsByUser);
router.get("/attempts/quiz/:quizId", getAttemptsByQuiz);

module.exports = router;
