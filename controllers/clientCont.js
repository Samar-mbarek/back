const Client = require("../models/client");
const bcrypt = require("bcryptjs")

exports.saveClient = async (req, res, next) => {

  //hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const client = new Client({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    cin: req.body.cin,
    tel: req.body.tel,
    email: req.body.email,
    password: hashedPassword


  });
  client
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        status: true,
        data: client,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get = (req, res) => {
  Client.find({}).exec(function (err, clients) {
    if (err) {
      console.error("erreur");
    } else {

      res.json(clients);
    }
  });
}
exports.putById = (req, res) => {
  Client.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((client) => {
      res.status(200).send(client)
    })
    .catch((error) => { console.log(error) });
}

exports.deleteById = (req, res) => {
  Client.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      res.status(200).json("Deleted...")
    })
    .catch((error) => { console.log(error) });
}
exports.getById = (req, res) => {
  //let productId = req.params.productId;
  Client.findById({ _id: req.params.id })
    .then((client) => {
      res.status(200).send(client)
    })
    .catch((error) => { console.log(error) });
}