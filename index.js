const express = require("express");
var cors = require("cors");
const app = express();
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = 4000;

app.get("/", async (req, res) => {
  res.send("server started");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("Success");
});

app.listen(port, () => {
  console.log("Server started : " + port);
});
