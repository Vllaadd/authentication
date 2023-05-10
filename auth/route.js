const express = require("express");
const { register, login, update, deleteUser } = require("./auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(update);
router.route("/deleteUser").delete(deleteUser);



module.exports = router;