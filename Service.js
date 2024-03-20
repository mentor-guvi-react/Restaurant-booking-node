const { RegistrationModel, BookingModel } = require("./Schema");
const { ObjectId } = require("mongodb");

const handleLogin = (req, responseApi) => {
  const query = RegistrationModel.findOne({ username: req.body.username });
  query.select("email phonenumber username");
  query
    .exec()
    .then((queryResponse) => responseApi.send(queryResponse))
    .catch((err) => console.log(err));
};

const handleRegistration = (req, responseApi) => {
  RegistrationModel.create({
    ...req.body,
  })
    .then((resDb) => responseApi.send(resDb))
    .catch((error) => console.log(error));
};

const handleCreateBooking = (req, responseApi) => {
  console.log(req.body, "req.body");
  BookingModel.create({
    ...req.body,
    isCancelled: false,
  })
    .then((resDb) => responseApi.send(resDb))
    .catch((error) => console.log(error));
};

const handleRestaurentSlots = (req, responseApi) => {
  const query = BookingModel.find({
    ...req.body,
  });
  query.select("selectedSeat time");
  query
    .exec()
    .then((queryResponse) => responseApi.send(queryResponse))
    .catch((err) => console.log(err));
};

const getBookingsForUserId = (req, responseApi) => {
  console.log(req.params.userId, "req.params.userId");
  const query = BookingModel.find({
    userId: req.params.userId,
  });

  query.select("restaurantId selectedSeat selectedDate time");

  query
    .exec()
    .then((queryResponse) => responseApi.send(queryResponse))
    .catch((err) => console.log(err));
};

const cancelBooking = async (req, responseApi) => {
  const filter = { _id: new ObjectId(req.params.bookingId) };
  const update = { isCancelled: true };
  const doc = await BookingModel.findOneAndUpdate(filter, update);

  if (doc.isCancelled) {
    responseApi.send("Cancelled Successfully");
  } else {
    responseApi.send("cant cancel");
  }
};

module.exports = {
  handleLogin,
  handleRegistration,
  handleCreateBooking,
  handleRestaurentSlots,
  getBookingsForUserId,
  cancelBooking,
};
