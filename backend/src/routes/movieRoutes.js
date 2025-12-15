import express from "express";
import upload from "../middleware/upload.js";
import {
  createMovie,
  getMoviesByGenre
} from "../controllers/movieController.js";

const router = express.Router();

import { adminAuth } from '../middleware/adminAuth.js';

// Ruta pública - ver películas por género
router.get("/genre/:genre", getMoviesByGenre);

// Ruta protegida - crear películas
router.post("/", 
  adminAuth,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  createMovie
);

export default router;