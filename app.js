const express = require("express");
const app = express();
const path = require('path');

//Middlewares
app.use(express.json());


//Static Files
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
module.exports = app;