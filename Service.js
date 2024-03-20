const { RegistrationModel, BookingModel } = require("./Schema");

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

module.exports = {
  handleLogin,
  handleRegistration,
  handleCreateBooking,
  handleRestaurentSlots,
};
