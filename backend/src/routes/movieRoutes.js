import express from 'express';
import movieController from '../controllers/movieController.js';

const router = express.Router();

/**
 * @route   POST /api/movies
 * @desc    Crear una nueva película con video
 * @access  Public
 */
router.post('/', 
  movieController.uploadMiddleware,
  movieController.createMovie
);

/**
 * @route   GET /api/movies
 * @desc    Obtener todas las películas (con paginación y filtros)
 * @access  Public
 * @query   page, limit, genre, search
 */
router.get('/', movieController.getAllMovies);

/**
 * @route   GET /api/movies/:id
 * @desc    Obtener una película por ID
 * @access  Public
 */
router.get('/:id', movieController.getMovieById);

/**
 * @route   PUT /api/movies/:id
 * @desc    Actualizar información de una película
 * @access  Public
 */
router.put('/:id', movieController.updateMovie);

/**
 * @route   DELETE /api/movies/:id
 * @desc    Eliminar una película
 * @access  Public
 */
router.delete('/:id', movieController.deleteMovie);

export default router;