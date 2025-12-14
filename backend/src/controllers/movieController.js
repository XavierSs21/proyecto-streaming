import Movie from "../models/movie.js";

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
      videoUrl: video.location,       // URL de S3
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
