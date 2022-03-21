require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// ENABLE USE OF STATIC FILES
app.use("/public", express.static(__dirname + "/public"));

// MIDDLEWARE FOR ALL REQUESTS
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// SENDFILE METHOD WITH __dirname
app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

app.get("/api/", (req, res) => {
  const event = new Date();
  res.json({
    unix: event.valueOf(),
    utc: event.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  let { date } = req.params;

  if (!isNaN(Number(date))) {
    date = parseFloat(date);
  }

  const event = new Date(date);

  if (event.toUTCString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: event.valueOf(),
    utc: event.toUTCString(),
  });
});

app.listen(port, function () {
  console.log("timestamp-microservice is listening on port " + port + "...");
});
