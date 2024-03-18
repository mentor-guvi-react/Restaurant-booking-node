const express = require("express");
var cors = require("cors");
const app = express();
var bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

var connectState = 0;
const mongoDb =
  "mongodb+srv://mentorguvi:AsG5HtQYGlXeB4m4@cluster0.cysvbru.mongodb.net/";

const connectMongoDb = async (res) => {
  try {
    const response = await mongoose.connect(mongoDb);
    res && res.send("connected succes");
    connectState = 1;
  } catch (error) {
    res && res.send("connected Failed");
    console.log(error, "error connection");
  }
};

const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
  email: { type: String },
  password: { type: String },
  phonenumber: { type: String },
  username: { type: String },
});

const RegistrationModel = mongoose.model("Registration", RegistrationSchema);

app.use(cors());
app.use(bodyParser.json());

const port = 4000;

app.get("/", async (req, res) => {
  res.send("server started");
});

app.get("/connectDb", async (req, res) => {
  connectMongoDb(res);
});

app.post("/resgistration", async (req, responseApi) => {
  !connectState && connectMongoDb();
  RegistrationModel.create({
    ...req.body,
  })
    .then((resDb) => responseApi.send(resDb))
    .catch((error) => console.log(error));
});

app.post("/login", (req, responseApi) => {
  !connectState && connectMongoDb();
  const query = RegistrationModel.findOne({ username: req.body.username });
  query.select("email phonenumber username");
  query
    .exec()
    .then((queryResponse) => responseApi.send(queryResponse))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log("Server started : " + port);
});
