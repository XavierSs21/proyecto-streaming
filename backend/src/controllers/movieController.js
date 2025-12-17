import Movie from "../models/movie.js";
import logger from "../../config/logger.js";

const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      director,
      year,
      duration,
      genre
    } = req.body;

    const video = req.files.video?.[0];
    const thumbnail = req.files.thumbnail?.[0];

    if (!video) {
      logger.warn('Intento de crear película sin video', {
        requestId: req.requestId,
        userId: req.user._id,
        ip: req.ip,
      });
      return res.status(400).json({ message: "El video es obligatorio" });
    }

    const movie = await Movie.create({
      title,
      description,
      director,
      year,
      duration,
      genre,
      videoUrl: video.location,
      thumbnailUrl: thumbnail?.location,
      uploadedBy: req.user._id,     
    });

    // LOG DE AUDITORIA: Película creada
    logger.info('Película creada', {
      requestId: req.requestId,
      action: 'CREATE_MOVIE',
      userId: req.user._id,
      userEmail: req.user.correo,
      movieId: movie._id,
      movieTitle: movie.title,
      genre: movie.genre,
      ip: req.ip,
      timestamp: new Date().toISOString(),
    });

    res.status(201).json(movie);
  } catch (error) {
    logger.error('Error al crear película', {
      requestId: req.requestId,
      userId: req.user._id,
      error: error.message,
      stack: error.stack,
      ip: req.ip,
    });
    res.status(500).json({ message: "Error al crear la película" });
  }
};

const getMoviesByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const movies = await Movie.find({ genre }).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    logger.error('Error al obtener películas por género', {
      requestId: req.requestId,
      genre: req.params.genre,
      error: error.message,
    });
    res.status(500).json({ message: "Error al obtener películas" });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    logger.error('Error al obtener todas las películas', {
      requestId: req.requestId,
      error: error.message,
    });
    res.status(500).json({ message: "Error al obtener películas" });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json(movie);
  } catch (error) {
    logger.error('Error al obtener película por ID', {
      requestId: req.requestId,
      movieId: req.params.id,
      error: error.message,
    });
    res.status(500).json({ message: "Error al obtener película" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { title, description, director, year, duration, genre } = req.body;

    const video = req.files?.video?.[0];
    const thumbnail = req.files?.thumbnail?.[0];

    // Guardar estado anterior para auditoría
    const oldMovie = await Movie.findById(req.params.id);
    if (!oldMovie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    // Construir update solo con campos que llegaron
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (director !== undefined) updateData.director = director;
    if (year !== undefined) updateData.year = year;
    if (duration !== undefined) updateData.duration = duration;
    if (genre !== undefined) updateData.genre = genre;

    // Archivos (solo si vienen)
    if (video) updateData.videoUrl = video.location;
    if (thumbnail) updateData.thumbnailUrl = thumbnail.location;

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    // LOG DE AUDITORIA: Película actualizada
    logger.info('Película actualizada', {
      requestId: req.requestId,
      action: 'UPDATE_MOVIE',
      userId: req.user._id,
      userEmail: req.user.correo,
      movieId: movie._id,
      movieTitle: movie.title,
      changedFields: Object.keys(updateData),
      oldValues: {
        title: oldMovie.title,
        genre: oldMovie.genre,
      },
      newValues: {
        title: movie.title,
        genre: movie.genre,
      },
      ip: req.ip,
      timestamp: new Date().toISOString(),
    });

    res.json(movie);
  } catch (error) {
    logger.error('Error al actualizar película', {
      requestId: req.requestId,
      userId: req.user?._id,
      movieId: req.params.id,
      error: error.message,
      stack: error.stack,
      ip: req.ip,
    });
    res.status(500).json({ message: "Error al actualizar película" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    // Guardar info antes de eliminar
    const movieData = {
      id: movie._id,
      title: movie.title,
      genre: movie.genre,
      director: movie.director,
    };

    await Movie.findByIdAndDelete(req.params.id);

    // LOG DE AUDITORIA: Película eliminada
    logger.warn('Película eliminada', {
      requestId: req.requestId,
      action: 'DELETE_MOVIE',
      userId: req.user._id,
      userEmail: req.user.correo,
      movieId: movieData.id,
      movieTitle: movieData.title,
      movieGenre: movieData.genre,
      movieDirector: movieData.director,
      ip: req.ip,
      timestamp: new Date().toISOString(),
    });

    res.json({ message: "Película eliminada exitosamente" });
  } catch (error) {
    logger.error('Error al eliminar película', {
      requestId: req.requestId,
      userId: req.user?._id,
      movieId: req.params.id,
      error: error.message,
      stack: error.stack,
      ip: req.ip,
    });
    res.status(500).json({ message: "Error al eliminar película" });
  }
};

export default {
  getAllMovies,
  createMovie,
  getMovieById,
  deleteMovie,
  updateMovie,
  getMoviesByGenre,
}