const express = require("express");
const router = express.Router();
const {
  getUserById,
  deleteUser,
  getAllUsers,
  deleteAllUsers,
} = require("../controller/users.controller");


router.route("/").get(getAllUsers).delete(deleteAllUsers)
router.route("/:userId").get(getUserById).delete(deleteUser);

module.exports = router;
