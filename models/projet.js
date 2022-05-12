const  mongoose = require("mongoose");
 const projetSchema = new mongoose.Schema({
    name: {type: String, required: true},
    titre: {type: String, required: true},
    file: {type: String, required: true},

 
     
 })

 module.exports = mongoose.model("Projet", projetSchema);