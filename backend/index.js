const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./models/User.js");
require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "lajlsjldalbflalfjlajdlajldjlasda";

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL);

// Post request for registering a new member
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  // Using UserModel => User to create new user and it returns db userDoc
  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (err) {
    res.status(422).json(err);
  }
});

// Login Route
app.post("/login", async (req, res) => {
  console.log("We are here");
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    console.log(userDoc);
    if (userDoc) {
      console.log(userDoc);
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      }
    } else {
      res.status(422).json("Password not Ok");
    }
  } catch (err) {
    res.status(422).json(err);
  }
});

// Logout route
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// profile Route
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { username, email, _id } = await User.findById(userData.id);
      console.log(username);
      res.json({ username, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
