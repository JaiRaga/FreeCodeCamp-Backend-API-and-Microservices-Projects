const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");

const db = require("./config/dev").mongoURI;
const User = require("./models/User");
const Exercise = require("./models/Exercise");

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.connect(db, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to Atlas");
  } catch (e) {
    console.log("********Error********", e);
    process.exit(1);
  }
};

connectDB();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Not found middleware
// app.use((req, res, next) => {
//   if (!!req.body) {
//     res.send({ status: 404, message: "not found" });
//   }
//   next();
// });

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage;
  // console.log(err, req);
  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message;
  } else {
    // generic or custom error
    errCode = err.status || 500;
    errMessage = err.message || "Internal Server Error";
  }
  res
    .status(errCode)
    .type("txt")
    .send(errMessage);
});

// Creating a User
app.post("/api/exercise/new-user", async (req, res) => {
  const username = req.body.username;

  try {
    const user = new User({ username });
    await user.save();
    res.send({ username: user.username, _id: user._id });
  } catch (e) {
    res.send("username already taken");
  }
});

app.get("/api/exercise/users", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (e) {
    res.status(404).send("No users exist.");
  }
});

app.post("/api/exercise/add", async (req, res) => {});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
