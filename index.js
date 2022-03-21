const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 3000;

// ENABLE CORS FOR TESTING PURPOSES
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(bodyParser.urlencoded({ extended: false }));

// ENABLE USE OF STATIC FILES
app.use("/public", express.static(__dirname + "/public"));

// LOG REQUEST INFORMATION
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// HOME PAGE ROUTING
app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

// RETURNS CURRENT TIMESTAMP IF date_string IS EMPTY
app.get("/api/", (req, res) => {
  const event = new Date();
  res.json({
    unix: event.getTime(),
    utc: event.toUTCString(),
  });
});

// RETURNS JSON OBJECT WITH UNIX AND UTC KEYS
app.get("/api/:date_string", (req, res) => {
  let { date_string } = req.params;

  if (!isNaN(Number(date_string))) {
    date_string = parseFloat(date_string);
  }

  if (new Date(date_string).toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
    return;
  }

  const event = new Date(date_string);
  console.log(event);

  res.json({
    unix: event.valueOf(),
    utc: event.toUTCString(),
  });
});

const listener = app.listen(port, function () {
  console.log(
    "timestamp-microservice is listening on port " + listener.address().port
  );
});
