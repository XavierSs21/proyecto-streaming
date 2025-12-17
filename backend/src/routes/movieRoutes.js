import express from "express";
import upload, { handleUploadError } from "../middleware/upload.js";
import { adminAuth } from "../middleware/adminAuth.js";
import movieController from "../controllers/movieController.js";
import { createMovieLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// ===== RUTAS PÚBLICAS =====
router.get("/", movieController.getAllMovies);
router.get("/genre/:genre", movieController.getMoviesByGenre);
router.get("/:id", movieController.getMovieById);

// ===== RUTAS PROTEGIDAS (admin) =====
router.post("/", 
  adminAuth,
  createMovieLimiter,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  handleUploadError,
  movieController.createMovie
);

router.put("/:id", adminAuth, 
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]), 
  handleUploadError,
  movieController.updateMovie
);

router.delete("/:id", adminAuth, movieController.deleteMovie);

export default router;