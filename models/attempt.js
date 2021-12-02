const mongoose = require("mongoose");
const {ObjectId} = mongoose;

const attemptSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    quiz: {
        type: ObjectId,
        ref: "Quiz",
        required: true
    },
    score: {
        type: Number,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("Attempt", attemptSchema);