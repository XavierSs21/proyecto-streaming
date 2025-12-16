import Movie from "../models/Movie.js";

export const createMovie = async (req, res) => {
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
      uploadedBy: req.userId      
    });

    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la película" });
  }
};

export const getMoviesByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const movies = await Movie.find({ genre }).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener películas" });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener películas" });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener película" });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      director,
      year,
      duration,
      genre
    } = req.body;

    const video = req.files?.video?.[0];
    const thumbnail = req.files?.thumbnail?.[0];

    const updateData = {
      title,
      description,
      director,
      year,
      duration,
      genre
    };

    if (video) {
      updateData.videoUrl = video.location;
    }
    if (thumbnail) {
      updateData.thumbnailUrl = thumbnail.location;
    }

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar película" });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    res.json({ message: "Película eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar película" });
  }
};
