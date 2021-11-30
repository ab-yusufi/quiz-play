const mongoose = require("mongoose");
const { ObjectId } = mongoose;

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  optionA: {
    type: String,
    required: true,
  },
  optionB: {
    type: String,
    required: true,
  },
  optionC: {
    type: String,
    required: true,
  },
  optionD: {
    type: String,
    required: true,
  },
  correct: {
    type: String,
    enum: ["A", "B", "C", "D"],
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema)

const quizSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  questions: [questionSchema],
  blocked: {
    type: Boolean,
    default: false,
    required: true,
  },
  visibility: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = {Question, Quiz};
