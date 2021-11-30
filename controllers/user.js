const User = require("../models/user");

exports.getUserById = async (req, res, next, id) => {
  try {
    await User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User Not Found",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUser = (req, res) => {
  req.user.salt = undefined;
  req.user.encry_password = undefined;
  return res.json(req.user);
};

exports.getAllUsers = async (req, res) => {
  try {
    User.find()
      .select("-password")
      .exec((err, users) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to get users",
          });
        }
        res.json(users);
      });
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "You are not authorized to update this user",
          });
        }
        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = req.user;
    await user.remove((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to delete user",
        });
      }
      res.json(user);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.blockUnblockUser = async (req, res) => {
  try {
    const user = req.body;
    User.findByIdAndUpdate(
      { _id: user._id },
      { $set: { blocked: !user.blocked } },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "You are not authorized to update this user",
          });
        }
        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.unblockUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: { blocked: false } },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "You are not authorized to update this user",
          });
        }
        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
