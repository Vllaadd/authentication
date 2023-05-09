const express = require("express");
const { register, login, update } = require("./auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(update)



module.exports = router;