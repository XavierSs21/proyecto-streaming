import express from "express";
import myListController from "../controllers/myListController.js";
import { auth } from "../middleware/auth.js";


const router = express.Router();

router.post("/:movieId", auth, myListController.addToMyList);
router.get("/", auth, myListController.getMyList);
router.delete("/:movieId", auth, myListController.removeFromMyList);

export default router;
