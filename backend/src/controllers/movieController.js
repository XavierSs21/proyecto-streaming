import Movie from "../models/Movie.js";

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

    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la película" });
  }
};

const getMoviesByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const movies = await Movie.find({ genre }).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener películas" });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
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
    res.status(500).json({ message: "Error al obtener película" });
  }
};

// const updateMovie = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       director,
//       year,
//       duration,
//       genre
//     } = req.body;

//     const video = req.files?.video?.[0];
//     const thumbnail = req.files?.thumbnail?.[0];

//     const updateData = {
//       title,
//       description,
//       director,
//       year,
//       duration,
//       genre
//     };

//     if (video) {
//       updateData.videoUrl = video.location;
//     }
//     if (thumbnail) {
//       updateData.thumbnailUrl = thumbnail.location;
//     }

//     const movie = await Movie.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     if (!movie) {
//       return res.status(404).json({ message: "Película no encontrada" });
//     }

//     res.json(movie);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al actualizar película" });
//   }
// };

const updateMovie = async (req, res) => {
  try {
    const { title, description, director, year, duration, genre } = req.body;

    const video = req.files?.video?.[0];
    const thumbnail = req.files?.thumbnail?.[0];

    // 1) Construye update SOLO con campos que sí llegaron
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (director !== undefined) updateData.director = director;

    if (year !== undefined) updateData.year = year;
    if (duration !== undefined) updateData.duration = duration;
    if (genre !== undefined) updateData.genre = genre;

    // 2) Archivos (solo si vienen)
    if (video) updateData.videoUrl = video.location;
    if (thumbnail) updateData.thumbnailUrl = thumbnail.location;

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
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



const deleteMovie = async (req, res) => {
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


export default {
  getAllMovies,
  createMovie,
  getMovieById,
  deleteMovie,
  updateMovie,
  getMoviesByGenre,
}