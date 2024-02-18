var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var bcrypt = require("bcrypt");
var mongoose = require("mongoose");
require("dotenv").config();
app.use(express.static(__dirname + "/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://nmoukthika14:1234@cluster0.6k5tphz.mongodb.net/void", { useNewUrlParser: true, useUnifiedTopology: true });
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name : String,
  events : ["vr" , "vr" , "laser" , "laser"]
});
var users = mongoose.model("login", userSchema);
app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });
  return res.redirect("/signin.html");
});
app.post("/register", async (req, res) => {
  var username = req.body.username
  var password = req.body.password
  var name = req.body.name

  var confirmPassword = req.body.confirmPassword


  if (toString(password) == toString(confirmPassword)) {
    const hashedPassword = await bcrypt.hash(password, 10);

    var data = {
      username: username,
      password: hashedPassword,
      name : name
    };
    try {
      await users.create(data);
      res.redirect("signin.html");
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  } 
  else {
    res.status(400).send("Password not matching");
  }
});
app.post("/signin", async (req, res) => {
  var username = req.body.username
  var password  = req.body.password
  var name = req.body.name
  try {
    var user = await users.findOne({ username: username });
    module.exports = user

    if (user) {
      var pass = await bcrypt.compare(password, user.password);

      if (pass) {
        res.send(user.username , user.events);
      } else {
        res.redirect("signin.html");
      }
    } else {
      res.redirect("signin.html");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
var PORT = process.env.PORT || 200;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
