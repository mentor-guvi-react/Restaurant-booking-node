const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectMongoDb = async (req, res, next) => {
  try {
    console.log(
      mongoose.connection.readyState,
      " -> mongoose.connection.readyState"
    );
    if (mongoose.connection.readyState === 1) return;

    await mongoose.connect(process.env.myuri);
    if (mongoose.connection.readyState == 2) {
      console.log("connecting...");
    } else if (mongoose.connection.readyState == 1) {
      console.log("connected ...");
    }
    // next && next();
  } catch (error) {
    res && res.send("connected Failed");
    console.log(error, "error connection");
  }
};

module.exports = {
  connectMongoDb,
  mongoose,
};
