import express from "express";
import { register } from "../controllers/usercontroller.js";
import { login } from "../controllers/usercontroller.js";
import { logout } from "../controllers/usercontroller.js";
import { authorisation } from "../middlewares/auth.js";
import { getUser } from "../controllers/usercontroller.js";
const router=express.Router();
router.post("/register",register)
router.post("/login", login);
router.get("/logout", authorisation, logout);
router.get("/getuser", authorisation, getUser);
export default router;