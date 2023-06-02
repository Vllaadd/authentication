import { Router } from "express";
import { register, login, update, deleteUser } from "./auth";
import { adminAuth } from "../middleware/auth";


const router = Router();



router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").put(adminAuth, update);
router.route("/deleteUser").delete(adminAuth, deleteUser);





export default router;