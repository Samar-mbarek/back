const express = require("express");
const router = express.Router();
const travauxCont = require("../controllers/travauxCont");
const multerInstance = require("../middleware/file")
router.post("/saveTravaux",multerInstance.upload.single('file'),  travauxCont.saveTravaux)

module.exports = router;