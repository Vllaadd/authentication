const  Router = require("express");
const { register, login, update, deleteUser } = require("./auth");
const { adminAuth } = require("../middleware/auth");


const router = Router();



router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(adminAuth, update);
router.route("/deleteUser").delete(adminAuth, deleteUser);





module.exports =  router;