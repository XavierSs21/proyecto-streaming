import express from "express";
import UserController from "../controllers/UserController.js";
import { auth } from "../middleware/auth.js";
import { authLimiter, passwordResetLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", authLimiter, UserController.createUser);
router.post("/login", authLimiter,  UserController.loginUser);
router.post("/forgot-password", passwordResetLimiter, UserController.forgotPassword);
router.post("/reset-password/:token", UserController.resetPassword);
router.get("/", auth, UserController.getCurrentUser);

export default router;
