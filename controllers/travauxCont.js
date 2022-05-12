const Cours = require("../models/travaux");


exports.saveTravaux = (req, res, next) => {
  

    const travaux = new Travaux({
       name: req.body.name,
        file: req.file.path,
        description: req.body.description,   
    });
    travaux
      .save()
      .then(result => {
        console.log(result);
        res.status(200).json({
          status: true,
          data: travaux,
      });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };