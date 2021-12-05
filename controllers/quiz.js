const { Quiz } = require("../models/quiz");

exports.getQuizById = async (req, res, next, id) => {
  try {
    await Quiz.findById(id).exec((err, quiz) => {
      if (err) {
        return res.status(404).json({
          error: "Quiz Not Found ",
        });
      }
      req.quiz = quiz;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const quiz = await new Quiz(req.body);
    quiz.user = req.user._id;
    await quiz.save((err, quiz) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to Create Quiz",
          message: err.errors,
        });
      }
      res.json(quiz);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getQuiz = (req, res) => {
  return res.json(req.quiz);
};

exports.getAllPublicQuizes = (req, res) => {
  try {
    Quiz.find({ blocked: false, visibility: true })
      .populate({
        path: "user",
        select: "name username blocked",
        match: { blocked: { $ne: true } },
      })
      .exec((err, quizes) => {
        var tempQuizes = [];
        for (i = 0; i < quizes.length; i++) {
          if (quizes[i].user !== null) {
            tempQuizes.push(quizes[i]);
          }
        }
        if (err) {
          return res.status(400).json({
            error: "NO Quizes Found",
          });
        }
        res.json(tempQuizes);
      });
  } catch (error) {
    console.log(error);
  }
};

exports.getQuizByUser = (req, res) => {
  try {
    Quiz.find({ user: req.user._id }).exec((err, quizes) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to Find Quiz",
        });
      }
      res.json(quizes);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    Quiz.findByIdAndUpdate(
      { _id: req.quiz._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, quiz) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to Update Quiz",
          });
        }
        res.json(quiz);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = req.quiz;

    quiz.remove((err, quiz) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to Delete Quiz",
        });
      }
      res.json({
        message: "Successfull deleted",
      });
    });
  } catch (error) {
    console.log(error);
  }
};
exports.blockUnblockQuiz = async (req, res) => {
  try {
    Quiz.findByIdAndUpdate(
      { _id: req.quiz._id },
      { $set: { blocked: !req.quiz.blocked } },
      { new: true, useFindAndModify: false },
      (err, quiz) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to Block Quiz",
          });
        }
        res.json(quiz);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
exports.publicPrivateQuiz = async (req, res) => {
  try {
    Quiz.findByIdAndUpdate(
      { _id: req.quiz._id },
      { $set: { visibility: !req.quiz.visibility } },
      { new: true, useFindAndModify: false },
      (err, quiz) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to Block Quiz",
          });
        }
        res.json(quiz);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
