import express from "express";
import UserController from "../controllers/UserController.js";


const router = express.Router();

router.post("/register", UserController.createUser);
router.post("/login",  UserController.loginUser);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password/:token", UserController.resetPassword);
router.get("/", UserController.getCurrentUser);

export default router;
