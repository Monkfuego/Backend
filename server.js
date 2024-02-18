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

    var pass = false
    if(toString(password) == toString(user.password)){
      pass = true
    }
    else{
      pass = false
    }

    if (pass) {
      var regid = user.username
      var name = user.name
      var events = user.events
      return res.send(
        `<html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Landing Page</title>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
          
              <!-- custom css file link  -->
              <link rel="stylesheet" href="style.css">
          
          </head>
          <body>
            <header class="header">
          
              <a href="#" class="logo"> LOGO</a>
              <nav class="navbar">
                  </nav>
              </div>
          </header>    
          <section class="home" id="home">
              <div class="content">
                  <h3>Welcome <span>${name}</span></h3>
                  <p>Reg No ${regid}</p>
                  <p placehoder="Event Reg List"></p>
              </div>
          </section>
          <section class="blogs" id="blogs">
              <h1 class="heading"> VTAPP <span>  EVENTS </span> </h1>
              <div class="box-container">
          
                  <div class="box">
                      <img src="" alt="">
                      <div class="content">
                          <div class="icons">
                              <a href="#"></i> Venue </a>
                              <a href="#"> <i class="fas fa-calendar"></i></a>
                          </div>
                          <h3>${countFrequency(events)[0]}</h3>
                          <p>details </p>
                          <a href="" class="btn">CHECK</a>
                      </div>
                  </div>
                  <div class="box">
                      <img src="" alt="">
                      <div class="content">
                          <div class="icons">
                              <a href="#"></i> Venue </a>
                              <a href="#"> <i class="fas fa-calendar"></i></a>
                          </div>
                          <h3>${countFrequency(events)[1]}</h3>
                          <p>Details </p>
                          <a href="#" class="btn">CHECK</a>
                      </div>
                  </div>
                  </div>
              </div>
          </section>`
      );

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

function countFrequency(arr) {
  const frequency = {};

  // Loop through the array
  for (let i = 0; i < arr.length; i++) {
    const currentItem = arr[i];

    // Check if the item is already in the frequency object
    if (frequency[currentItem] === undefined) {
      // If not, initialize the count to 1
      frequency[currentItem] = 1;
    } else {
      // If yes, increment the count
      frequency[currentItem]++;
    }
  }

  // Display the frequency of each item
  let result = [];
  for (const item in frequency) {
    result.push(`${item}: ${frequency[item]} tickets`);
  }
  console.log(result)
  return result;
}