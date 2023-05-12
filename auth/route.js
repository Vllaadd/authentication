const express = require("express");
const { register, login, update, deleteUser } = require("./auth");
const { register, login, update, deleteUser, getUsers } = require("./auth");
const { adminAuth, userAuth } = require("./middleware/auth");


const router = express.Router();



router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(adminAuth, update);
router.route("/deleteUser").delete(adminAuth, deleteUser);

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));



module.exports = router;