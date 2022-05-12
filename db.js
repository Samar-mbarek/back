const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://siwar:siwar123.@cluster0.shzif.mongodb.net/firstdb")
.then(db => console.log("database connected"))
.catch(err => console.log(err));
