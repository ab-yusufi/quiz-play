const Attempt = require("../models/attempt");

exports.createAttempt = async (req, res) => {
  try {
    console.log("req.body: ", req.body);
    const attempt = await new Attempt(req.body);
    attempt.user = req.user._id;
    attempt.quiz = req.quiz._id;
    await attempt.save((err, attempt) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to Submit Quiz",
          message: err.errors,
        });
      }
      res.json(attempt);
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getAttemptsByUser = async (req, res) => {
  try {
    const user = req.body;
    Attempt.find({ user: user._id }).exec((err, attempts) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to get quizes",
        });
      }
      res.json(attempts);
    });
  } catch (error) {
    console.log(err);
  }
}

exports.getAttemptsByQuiz = async (req, res) => {
  try {
    Attempt.find({ quiz: req.quiz._id })
    .populate("user", "username name")
    .exec((err, attempts) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to get quizes",
        });
      }
      res.json(attempts);
    });
  } catch (error) {
    console.log(err);
  }
};
