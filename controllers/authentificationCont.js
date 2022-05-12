const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Freelancer = require("../models/freelancer");
const Client = require("../models/client");
const jwt = require("jsonwebtoken");
const {secret} = require("../middleware/config.json");

exports.signup =  async (req, res) => {
    //checking if user email already exixts
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        res.status(400).send("Email already exists");
        return;
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //on process of adding new user
    const user = new User({
        firstName: req.body.firstName,   
        email: req.body.email,
        lastName: req.body.lastName,
        password: hashedPassword
    });
    const saveUser = await user.save();
    res.status(200).send("user created");
    //res.json(saveUser);

};
//signin route
/*exports.signin = async (req, res) => {
    User.findOne({ mail: req.body.mail })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User not found!' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Wrong password !' });
          }
          
          res.status(200).json({
            user,
            token: jwt.sign({
              data: user,
          }, config.secretKey)       
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
*/

exports.signin = async (req, res) =>{
    try {
        const user = await User.findOne({ email: req.body.email });
    
        if (!user) {
          const client = await Client.findOne({ email: req.body.email });
          if (client) {
            bcrypt.compare(
              req.body.password,
              client.password,
              function (err, isMatch) {
                if (isMatch && !err) {
                  var token = jwt.sign(
                    { _id: client._id, role: client.role },
                    secret,
                    { expiresIn: "1h" }
                  );
    
                  res.json({
                    success: true,
                    token: token,
                    role: "client",
                    user: client,
                  });
                } else {
                  res.send({
                    success: false,
                    msg: "Authentication failed. Wrong password.",
                  });
                }
              }
            );
          } else {
            const freelancer = await Freelancer.findOne({ email: req.body.email });
            if (!freelancer) {
              res.send({
                success: false,
                msg: "Authentication failed. User not found.",
              });
            } else {
              bcrypt.compare(
                req.body.password,
                freelancer.password,
                function (err, isMatch) {
                  if (isMatch && !err) {
                    var token = jwt.sign(
                      { _id: freelancer._id, role: freelancer.role },
                      secret,
                      { expiresIn: "1h" }
                    );
    
                    res.json({
                      success: true,
                      token: token,
                      role: "freelancer",
                      user: freelancer,
                    });
                  } else {
                    res.send({
                      success: false,
                      msg: "Authentication failed. Wrong password.",
                    });
                  }
                }
              );
            }
          }
        } else {
          bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
            if (isMatch && !err) {
              var token = jwt.sign({ _id: user._id, role: user.role }, secret, {
                expiresIn: "1h",
              });
    
              res.json({
                success: true,
                token: token,
                role: "admin",
                user: user,
              });
            } else {
              res.send({
                success: false,
                msg: "Authentication failed. Wrong password.",
              });
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
}
