const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const PORT = 3000;
const { log } = require("console");
const connectDB = require("./config/dbConn");

require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "lajlsjldalbflalfjlajdlajldjlasda";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "https://bookingapp-mern.vercel.app",
  })
);

// Connect to MongoDB
connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

function getUserDataFromToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

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
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  try {
    console.log(userDoc);
    if (userDoc) {
      console.log(userDoc);
      const passOk = bcrypt.compareSync(password, userDoc.password);
      console.log(passOk);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            console.log("Working here");
            console.log("printing token");
            console.log("jw", token);
            res
              .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
              })
              .json(userDoc);
          }
        );
      }
    } else {
      res.status(422).json("Password not Ok");
    }
  } catch (err) {
    res.status(422).json(err);
  }
  console.log("Outside here");
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

function uploadCloudinary(filePath) {
  const imageInfo = cloudinary.uploader
    .upload(filePath, {
      folder: "placeImages",
      use_filename: true,
      resource_type: "image",
    })
    .then((result) => {
      console.log("success", JSON.stringify(result, null, 2));
    })
    .catch((error) => {
      console.log("error", JSON.stringify(error, null, 2));
    });
  return imageInfo;
}

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const filePath = "/tmp/" + newName;
  await imageDownloader.image({
    url: link,
    dest: filePath,
  });
  uploadCloudinary(filePath);
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext.toLowerCase();
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos: photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    const placeDoc = await Place.find({ owner: id });
    res.json(placeDoc);
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos: photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/places", async (req, res) => {
  const placeDoc = await Place.find();
  res.json(placeDoc);
});

app.post("/bookings", async (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  const userData = await getUserDataFromToken(token);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/bookings", async (req, res) => {
  const { token } = req.cookies;
  const userData = await getUserDataFromToken(token);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.get("/test", (req, res) => {
  res.json("Its Working fine");
});
