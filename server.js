const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 200;

app.use(express.static(__dirname + "/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://nmoukthika14:1234@cluster0.6k5tphz.mongodb.net/void', { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  events: [{ type: String }]
});
const User = mongoose.model("login", userSchema);

app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });
  return res.redirect("/signin.html");
});

app.post("/register", async (req, res) => {
  const { username, password, name, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Password not matching");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, name });
    res.redirect("/signin.html");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.redirect("/signin.html");
    }

    const pass = await bcrypt.compare(password, user.password);

    if (pass) {
      return res.send({ username: user.username, events: user.events });
    } else {
      return res.redirect("/signin.html");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

