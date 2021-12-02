require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Importing Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const quizRoutes = require("./routes/quiz");
const attemptRoutes = require("./routes/attempt");



//Middlewares
app.use(express.json());
app.use(cors({origin: "https://quiz-play.herokuapp.com"}));
app.use(cookieParser());


//Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", quizRoutes)
app.use("/api", attemptRoutes)

//Static Files
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});



module.exports = app;