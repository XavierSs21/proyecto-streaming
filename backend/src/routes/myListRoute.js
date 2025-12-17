import express from "express";
import myListController from "../controllers/myListController.js";
import { auth } from "../middleware/auth.js";


const router = express.Router();

router.post("/my-list/:movieId", auth, myListController.addToMyList);
router.get("/my-list", auth, myListController.getMyList);
router.delete("/my-list/:movieId", auth, myListController.removeFromMyList);

export default router;
