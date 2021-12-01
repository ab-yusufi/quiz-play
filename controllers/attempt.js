const Attempt = require("../models/attempt");

exports.createAttempt = async (req,res) => {
    try {
        console.log("req.body: ", req.body)
        const attempt = await new Attempt(req.body)
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
    } catch(error){
        console.log(error)
    }
}
exports.getAttemptsByUser = (req,res) => {}
exports.getAttemptsByQuiz = (req,res) => {}
    
