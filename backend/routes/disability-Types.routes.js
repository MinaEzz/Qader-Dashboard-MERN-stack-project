const express = require("express");
const router = express.Router();
const {
  getAllDisabilities,
  addDisability,
} = require("../controller/disability-type.controller");

router.route("/").get(getAllDisabilities).post(addDisability)

module.exports = router;
