const express = require("express");
const router = express.Router();
const projetCont = require("../controllers/projetCont");
const multerInstance = require("../middleware/file")
router.post("/saveProjet",multerInstance.upload.single('file'),  projetCont.saveProjet)

module.exports = router;