"use strict";

var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");
const dns = require("dns");
const randomize = require("randomatic");
const db = require("./config/dev").mongoURI;
const Url = require("./models/Url");

var cors = require("cors");

var app = express();

// Basic Configuration
var port = 3000 || process.env.PORT;

/** this project needs a db !! **/

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    });
    console.log("Connected to mongodb atlas");
  } catch (err) {
    console.log("**************Error************** ", err);
    process.exit(1);
  }
};

connectDB();

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// URL Shortner Microservice
app.post("/api/shorturl/new", (req, res) => {
  const randomNum = randomize("0000");
  const parsedUrl = req.body.url.replace("https://www.", "");
  try {
    dns.lookup(parsedUrl, async (err, address, family) => {
      // console.log(address, family);
      if (address) {
        const url = new Url({ originalUrl: req.body.url, shortUrl: randomNum });
        await url.save();
        res.send({ original_url: url.originalUrl, short_url: url.shortUrl });
      } else {
        throw new Error();
      }
    });
  } catch (e) {
    res.send({ error: "invalid URL" });
  }
});

app.get("/api/shorturl/:url", async (req, res) => {
  const url = req.params.url;
  const isFound = await Url.findOne({ shortUrl: url });

  if (isFound) {
    res.redirect(isFound.originalUrl);
  } else {
    res.send({ error: "invalid URL" });
  }
});

app.listen(port, function() {
  console.log("Node.js listening ...");
});
