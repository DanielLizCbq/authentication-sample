var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var app = express();

var api = require("./routes/api/api");
var auth = require("./routes/auth/auth");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/auth_test", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use("/api", api);
app.use("/auth", auth);

app.use(function (req, res, next) {
  res.status(404).send("Not found");
});

app.listen(3000, (err) => {
  if (err) {
    console.error("Could not start the application...");
    console.log(err);
  } else {
    console.log("Server running on port 3000");
  }
});
