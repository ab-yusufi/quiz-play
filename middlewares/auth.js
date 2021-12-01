var expressJwt = require("express-jwt");

//protected routes
exports.isSignedIn = expressJwt({
  algorithms: ["HS256"],
  secret: process.env.SECRET,
  userProperty: "auth",
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  console.log("AUTH ENTErED")
  let checker = req.user && req.auth && req.user._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "UnAuthorized...ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied",
    });
  }
  next();
};

exports.isNotBlocked = (req, res, next) => {
  if (req.user.blocked) {
    return res.status(400).json({
      error: "You Are Blocked",
    });
  }
  next();
};
