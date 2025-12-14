import express from "express";
import upload from "../middleware/upload.js";
import {
  createMovie,
  getMoviesByGenre
} from "../controllers/movieController.js";

const router = express.Router();

import {auth} from '../middleware/auth.js'

router.post("/",auth, upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  createMovie
);

//obtener peli por genero
router.get("/genre/:genre",auth, getMoviesByGenre);

export default router;
