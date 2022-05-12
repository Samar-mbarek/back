const Freelancer = require("../models/freelancer");
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "freelancertunisie11@gmail.com",
    pass: "Freelance123."
  },
});


exports.saveFreelancer = async (req, res, next) => {

  try {
    
      //checking if user email already exixts
      const emailExist = await Freelancer.findOne({ email: req.body.email });
      if (emailExist) {
          res.status(400).send("Email already exists");
          return;
      }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const freelancer = new Freelancer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      cin: req.body.cin,
      tel: req.body.tel,
      email: req.body.email,
      password: hashedPassword


    });
    freelancer
      .save()
      .then(result => {
        console.log(result);
        var mailOptions = {
          from: "siwarbenmohamed120@gmail.com",
          to: req.body.email,
          subject: `Freelancer`,
          html: `<h2>${freelancer.firstName}! Thanks for registering on our site</h2>`

        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            res.send("error"); // if error occurs send error as response to client
          } else {
            console.log("Email sent: " + info.response);
            res.send("Sent Successfully"); //if mail is sent successfully send Sent successfully as response
          }
        });
        console.log("sent")
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  } catch (err) {
    console.log(err)
  }
};

exports.get = (req, res) => {
  Freelancer.find({}).exec(function (err, freelancers) {
    if (err) {
      console.error("erreur");
    } else {

      res.json(freelancers);
    }
  });
}
exports.putById = (req, res) => {
  Freelancer.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((freelancer) => {
      res.status(200).send(freelancer)
    })
    .catch((error) => { console.log(error) });
}

exports.deleteById = (req, res) => {
  Freelancer.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      res.status(200).json("Deleted...")
    })
    .catch((error) => { console.log(error) });
}
exports.getById = (req, res) => {
  //let productId = req.params.productId;
  Freelancer.findById({ _id: req.params.id })
    .then((freelancer) => {
      res.status(200).send(freelancer)
    })
    .catch((error) => { console.log(error) });
}