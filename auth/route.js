const express = require("express");
const router = express.Router();
const { register } = require("./auth");
router.route("/register").post(register);

app.use("/api/auth", require("./auth/route"))

module.exports = router;