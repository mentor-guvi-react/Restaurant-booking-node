const express = require("express");
var cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const { connectMongoDb } = require("./db");
const {
  handleLogin,
  handleRegistration,
  handleCreateBooking,
} = require("./Service");

app.use(cors());
app.use(bodyParser.json());

connectMongoDb();

// app.use(function (req, res, next) {
//   if (req.originalUrl === "/checkServer") {
//     res.end("Server Running : " + process.env.port);
//   } else {
//   }
// });

const port = 4000;

app.get("/", async (req, res) => {
  res.send("server started" + process.env.myuri);
});

app.get("/connectDb", async (req, res) => {
  connectMongoDb(req, res);
});

app.post("/resgistration", async (req, responseApi) => {
  handleRegistration(req, responseApi);
});

app.post("/login", (req, responseApi) => {
  handleLogin(req, responseApi);
});

app.post("/createBooking", (req, responseApi) => {
  handleCreateBooking(req, responseApi);
});

app.listen(port, () => {
  console.log("Server started : " + port);
});
