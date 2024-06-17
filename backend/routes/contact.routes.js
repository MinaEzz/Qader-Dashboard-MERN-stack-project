const express = require("express");
const router = express.Router();
const sendContactEmail = require("../controller/contact.controller");

router.route("/").post(sendContactEmail);

module.exports = router;
