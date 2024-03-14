const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("server started");
});

app.get("/login", (req, res) => {
  res.send("get login credentials");
});

app.listen(port, () => {
  console.log("Server started : " + port);
});
