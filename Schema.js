const { mongoose } = require("./db");

const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
  email: { type: String },
  password: { type: String },
  phonenumber: { type: String },
  username: { type: String },
});

const BookingSchema = new Schema({
  restaurantId: { type: String },
  selectedSeat: { type: Number },
  selectedDate: { type: String },
  time: { type: String },
  userId: { type: String },
  isCancelled: { type: Boolean },
});

const RegistrationModel = mongoose.model("Registration", RegistrationSchema);
const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = {
  RegistrationModel,
  BookingModel,
};
