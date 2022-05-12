const express = require("express");
const router = express.Router();
const authController = require("../controllers/authentificationCont");
const resetController = require("../controllers/resetController")

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

//ResetPasswordToken
router.post("/reset-token", resetController.ResetPassword);
router.post("/valid-token", resetController.ValidPasswordToken);
router.post("/new-password", resetController.NewPassword);
module.exports = router;