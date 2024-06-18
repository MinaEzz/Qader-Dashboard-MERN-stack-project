const express = require("express");
const router = express.Router();
const {signUp, login} = require("../controller/auth.controller")

router.route("/signup").post(signUp)
router.route("/login").post(login)

module.exports = router