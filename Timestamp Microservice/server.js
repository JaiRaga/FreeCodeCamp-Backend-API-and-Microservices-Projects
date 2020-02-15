// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// timestamp api
app.get("/api/timestamp/", (req, res) => {
  let date = new Date();
  res.send({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/api/timestamp/:date", (req, res) => {
  let raw = req.params.date;
  let rawDate;

  console.log(raw, typeof raw, raw.includes("-"));

  if (raw.includes("-")) {
    rawDate = raw;
  } else {
    rawDate = parseInt(req.params.date);
  }

  console.log(raw, rawDate);

  let date = new Date(rawDate);
  if (date.toUTCString() === "Invalid Date") {
    res.send({ error: "Invalid Date" });
  }

  res.send({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(3000 || process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
