const express = require("express");
const router = express.Router();
const freelancerCont = require("../controllers/freelancerCont");
const authorize = require("../_helpers/authorize");
const Role = require("../_helpers/role");

router.post("/saveFreelancer", freelancerCont.saveFreelancer);
router.get("/find", authorize([Role.Admin, Role.Client]),freelancerCont.get);
router.get("/findById/:id", freelancerCont.getById);
router.put("/findOneAndUpdate/:id", freelancerCont.putById);
router.delete("/findOneAndDelete/:id", freelancerCont.deleteById);

module.exports = router;