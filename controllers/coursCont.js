const Cours = require("../models/cours");


exports.saveCours = (req, res, next) => {
  

    const cours = new Cours({
       name: req.body.name,
        file: req.file.path,
        description: req.body.description,   
    });
    cours
      .save()
      .then(result => {
        console.log(result);
        res.status(200).json({
          status: true,
          data: cours,
      });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

  exports.putCours= (req, res) => {
    Cours.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then((cours) => {
        res.status(200).send(cours)
      })
      .catch((error) => { console.log(error) });
  }

  exports.getAll = (req, res) => {
    Cours.find({}).exec(function (err, cours) {
      if (err) {
        console.error("erreur");
      } else {
  
        res.json(cours);
      }
    });
  }
  
  exports.getById = (req, res) => {
    //let productId = req.params.productId;
    Cours.findById({ _id: req.params.id })
      .then((cours) => {
        res.status(200).send(cours)
      })
      .catch((error) => { console.log(error) });
  }

  exports.deleteById = (req, res) => {
    Cours.findOneAndDelete({ _id: req.params.id })
      .then((data) => {
        res.status(200).json("Deleted...")
      })
      .catch((error) => { console.log(error) });
  }
