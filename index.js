const express = require("express");
const authRoute =require("./routes/authentificationRoute");
const clientRoute =require("./routes/clientRoute");
const freelancerRoute =require("./routes/freelancerRoute");
const coursRoute =require("./routes/coursRoute");
const travauxRoute =require("./routes/travauxRoute");
const contactRoute =require("./routes/contactRoute");
const projetRoute =require("./routes/projetRoute");
const app = express();
const bodyParser = require('body-parser');


require("./db");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/client", clientRoute);
app.use("/api/freelancer", freelancerRoute);
app.use("/api/cours", coursRoute);
app.use("/api/travaux", travauxRoute);
app.use("/api/contact", contactRoute);
app.use("/api/projet", projetRoute);
app.listen(3003, () => {
    console.log("app started on port 3003")
})