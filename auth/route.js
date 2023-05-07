const express = require("express");
const { register } = require("./auth");

const router = express.Router();



router.route("/register").post(register);

app.use("/api/auth", require("./auth/route"))

module.exports = router;