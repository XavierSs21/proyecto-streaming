import MyList from "../models/list.js";
import Movie from "../models/movie.js";

const addToMyList = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Verificar que la película exista
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    const item = await MyList.create({
      user: req.user._id,
      movie: movieId,
    });

    res.status(201).json(item);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "La película ya está en tu lista" });
    }

    console.error(error);
    res.status(500).json({ message: "Error al agregar a mi lista" });
  }
};

const getMyList = async (req, res) => {
  try {
    const list = await MyList.find({ user: req.user._id })
      .populate("movie")
      .sort({ createdAt: -1 });

    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener mi lista" });
  }
};

const removeFromMyList = async (req, res) => {
  try {
    const { movieId } = req.params;

    const deleted = await MyList.findOneAndDelete({
      user: req.user._id,
      movie: movieId,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "La película no está en tu lista" });
    }

    res.json({ message: "Película eliminada de mi lista" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar de mi lista" });
  }
};

export default {
  addToMyList,
  getMyList,
  removeFromMyList,
};
