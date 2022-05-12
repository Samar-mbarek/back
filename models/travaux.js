const  mongoose = require("mongoose");
 const travauxSchema = new mongoose.Schema({
    nameF: {type: String, required: true},
    file: {type: String, required: true},

     
 })

 module.exports = mongoose.model("Travaux", travauxSchema);