const express = require("express");
const router = express.Router();
const {isSignedIn, isAuthenticated, isAdmin, isNotBlocked} = require("../middlewares/auth");
const {getUserById} = require("../controllers/user")
const {
    createAttempt,
    getAttemptsByUser,
    getAttemptsByQuiz
} = require("../controllers/user")

router.param("quizId", getQuizById);
router.param("userId", getUserById);



router.post("/attempt/:quizId/:userId", isSignedIn, isNotBlocked, createAttempt);

router.get("/attempts/:userId", getAttemptsByUser);
router.get("/attempts/:quizId", getAttemptsByQuiz);


module.exports = router;
