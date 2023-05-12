const express = require("express");
const { register, login, update, deleteUser } = require("./auth");
const { adminAuth } = require("../middleware/auth");

const router = express.Router();

const { register, login, update, deleteUser, getUsers } = require("./auth");
const { adminAuth } = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(adminAuth, update);
router.route("/deleteUser").delete(adminAuth, deleteUser);



module.exports = router;