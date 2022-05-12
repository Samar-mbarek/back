const express = require("express");
const router = express.Router();
const clientCont = require("../controllers/clientCont");

router.post("/saveClient", clientCont.saveClient);
router.get("/find", clientCont.get);
router.get("/findById/:id", clientCont.getById);
router.put("/findOneAndUpdate/:id", clientCont.putById);
router.delete("/findOneAndDelete/:id", clientCont.deleteById);

module.exports = router;