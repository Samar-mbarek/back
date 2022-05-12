const express = require("express");
const router = express.Router();
const coursCont = require("../controllers/coursCont");
const multerInstance = require("../middleware/file")
router.post("/saveCours",multerInstance.upload.single('file'),  coursCont.saveCours)
router.put("/updateCours/:id", coursCont.putCours)
router.get("/getAll", coursCont.getAll)
router.get("/getById/:id", coursCont.getById)
router.delete("/deleteById/:id", coursCont.deleteById)

module.exports = router;