import express from "express";
import UserController from "../controllers/UserController.js";
import { auth } from "../middleware/auth.js";


const router = express.Router();

router.post("/register", UserController.createUser);
router.post("/login",  UserController.loginUser);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password/:token", UserController.resetPassword);
router.get("/", auth, UserController.getCurrentUser);

export default router;
