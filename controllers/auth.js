const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }

    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save user in DB",
        });
      }
      res.json({
        name: user.username,
        email: user.email,
        id: user._id,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
  	console.log(req.body)
    const errors = validationResult(req);
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }

    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return res.status(400).json({
        error: "User Email Does Not Exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, {
      expire: new Date() + 2 * 24 * 60 * 60 * 1000,
    });

    //send response to front end
    const { _id, name, role, username } = user;
    return res.json({ token, user: { _id, name, email:user.email, role, username } });
  } catch (err) {
    console.log(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};
