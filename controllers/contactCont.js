const Contact = require("../models/contact");


exports.saveContact = (req, res, next) => { 
    const contact = new Contact({
       name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    contact
      .save()
      .then(result => {
        console.log(result);
        res.status(200).json({
          status: true,
          data: contact,
      });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };


  exports.deleteContact = (req, res) => {
    Contact.findOneAndDelete({ _id: req.params.id })
      .then((data) => {
        res.status(200).json("Deleted...")
      })
      .catch((error) => { console.log(error) });
  }

  exports.getAll = (req, res) => {
    Contact.find({}).exec(function (err, contact) {
      if (err) {
        console.error("erreur");
      } else {
  
        res.json(contact);
      }
    });
  }