const Projet = require("../models/projet");


exports.saveProjet = (req, res, next) => {
  

    const projet = new Projet({
       name: req.body.name,
       titre: req.body.titre,
        file: req.file.path,
       
    });
projet
      .save()
      .then(result => {
        console.log(result);
        res.status(200).json({
          status: true,
          data: projet,
      });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
