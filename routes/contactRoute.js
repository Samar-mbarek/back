const express = require("express");
const router = express.Router();
const contactCont = require("../controllers/contactCont");

router.post("/saveContact",  contactCont.saveContact);
router.delete("/deleteContact/:id",  contactCont.deleteContact);
router.get("/findAll",  contactCont.getAll);
module.exports = router;