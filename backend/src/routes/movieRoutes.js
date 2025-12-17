import express from "express";
import upload from "../middleware/upload.js";
import { adminAuth } from "../middleware/adminAuth.js";
import movieController from "../controllers/movieController.js";

const router = express.Router();


router.get("/genre/:genre", movieController.getMoviesByGenre);


router.post("/", adminAuth,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  movieController.createMovie
);

router.get("/", adminAuth, movieController.getAllMovies)
router.put("/:id", adminAuth, upload.fields([{ name: "video", maxCount: 1 },{ name: "thumbnail", maxCount: 1 }]) , movieController.updateMovie)
router.delete("/:id", adminAuth, movieController.deleteMovie)

export default router;