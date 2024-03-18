const { mongoose } = require("./db");

const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
  email: { type: String },
  password: { type: String },
  phonenumber: { type: String },
  username: { type: String },
});

const RegistrationModel = mongoose.model("Registration", RegistrationSchema);

module.exports = {
  RegistrationModel,
};
