const express = require("express");
const app = express();
const _ = require("lodash");
var cors = require("cors");

app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello! This site will be a tinder app for developers. Stay tuned!");
});

app.listen(5000, function () {
  console.log("Dev app listening on port 5000!");
});
