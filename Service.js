const { RegistrationModel } = require("./Schema");

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

module.exports = {
  handleLogin,
  handleRegistration,
};
