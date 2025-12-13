import Movie from '../models/Movie.js';
import oracleStorage from '../services/oracleStorage.js';
import multer from 'multer';
import path from 'path';

// Configurar multer para manejar archivos en memoria
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB máximo por archivo
  },
  fileFilter: (req, file, cb) => {
    // Validar tipos de archivo según el campo
    if (file.fieldname === 'video') {
      const allowedVideoTypes = /mp4|mkv|avi|mov|webm/;
      const extname = allowedVideoTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = file.mimetype.startsWith('video/');
      
      if (extname && mimetype) {
        return cb(null, true);
      }
      return cb(new Error('Solo se permiten archivos de video (mp4, mkv, avi, mov, webm)'));
    }
    
    if (file.fieldname === 'thumbnail') {
      const allowedImageTypes = /jpeg|jpg|png|webp/;
      const extname = allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = file.mimetype.startsWith('image/');
      
      if (extname && mimetype) {
        return cb(null, true);
      }
      return cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp)'));
    }
    
    cb(new Error('Campo de archivo no reconocido'));
  }
}).fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);

const movieController = {
  // Middleware de multer para las rutas
  uploadMiddleware: upload,

  /**
   * Crear una nueva película con video
   */
  async createMovie(req, res) {
    try {
      console.log('Creating new movie...');
      console.log('Body:', req.body);
      console.log('Files:', req.files);
      
      const { title, description, director, year, duration, genre } = req.body;
      
      if (!req.files || !req.files.video) {
        return res.status(400).json({ 
          error: 'Se requiere un archivo de video' 
        });
      }

      const videoFile = req.files.video[0];
      const thumbnailFile = req.files.thumbnail ? req.files.thumbnail[0] : null;

      // Generar nombres únicos para los archivos
      const timestamp = Date.now();
      const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
      const videoFileName = `videos/${timestamp}-${sanitizedTitle}${path.extname(videoFile.originalname)}`;
      const thumbnailFileName = thumbnailFile 
        ? `thumbnails/${timestamp}-${sanitizedTitle}${path.extname(thumbnailFile.originalname)}`
        : null;

      // Subir video a Oracle Storage
      console.log('Uploading video to Oracle Storage...');
      const videoUpload = await oracleStorage.uploadFile(
        videoFileName,
        videoFile.buffer,
        videoFile.mimetype
      );

      // Subir thumbnail si existe
      let thumbnailUpload = null;
      if (thumbnailFile) {
        console.log('Uploading thumbnail to Oracle Storage...');
        thumbnailUpload = await oracleStorage.uploadFile(
          thumbnailFileName,
          thumbnailFile.buffer,
          thumbnailFile.mimetype
        );
      }

      // Crear el registro en MongoDB
      const movie = new Movie({
        title,
        description,
        director,
        year: year ? parseInt(year) : undefined,
        duration: duration ? parseInt(duration) : undefined,
        genre: genre ? (Array.isArray(genre) ? genre : JSON.parse(genre)) : [],
        videoUrl: videoUpload.url,
        thumbnailUrl: thumbnailUpload ? thumbnailUpload.url : null,
        uploadedBy: req.user ? req.user._id : null 
      });

      await movie.save();

      console.log('Movie created successfully');
      
      res.status(201).json({
        message: 'Película creada exitosamente',
        movie
      });

    } catch (error) {
      console.error('Error creating movie:', error);
      res.status(500).json({ 
        error: 'Error al crear la película',
        details: error.message 
      });
    }
  },

  /**
   * Obtener todas las películas
   */
  async getAllMovies(req, res) {
    try {
      const { page = 1, limit = 10, genre, search } = req.query;
      
      const query = {};
      
      // Filtro por género
      if (genre) {
        query.genre = genre;
      }
      
      // Búsqueda por texto
      if (search) {
        query.$text = { $search: search };
      }
      
      const movies = await Movie.find(query)
        .sort({ uploadedAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      
      const count = await Movie.countDocuments(query);
      
      res.json({
        movies,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        total: count
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ 
        error: 'Error al obtener películas',
        details: error.message 
      });
    }
  },

  /**
   * Obtener una película por ID
   */
  async getMovieById(req, res) {
    try {
      const movie = await Movie.findById(req.params.id)
        .populate('uploadedBy', 'name email');
      
      if (!movie) {
        return res.status(404).json({ error: 'Película no encontrada' });
      }
      
      res.json(movie);
    } catch (error) {
      console.error('Error fetching movie:', error);
      res.status(500).json({ 
        error: 'Error al obtener la película',
        details: error.message 
      });
    }
  },

  /**
   * Actualizar información de una película (sin cambiar archivos)
   */
  async updateMovie(req, res) {
    try {
      const { title, description, director, year, duration, genre } = req.body;
      
      const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          director,
          year,
          duration,
          genre
        },
        { new: true, runValidators: true }
      );
      
      if (!movie) {
        return res.status(404).json({ error: 'Película no encontrada' });
      }
      
      res.json({
        message: 'Película actualizada exitosamente',
        movie
      });
    } catch (error) {
      console.error('Error updating movie:', error);
      res.status(500).json({ 
        error: 'Error al actualizar la película',
        details: error.message 
      });
    }
  },

  /**
   * Eliminar una película
   */
  async deleteMovie(req, res) {
    try {
      const movie = await Movie.findById(req.params.id);
      
      if (!movie) {
        return res.status(404).json({ error: 'Película no encontrada' });
      }

      // Extraer el nombre del archivo de la URL
      const videoFileName = movie.videoUrl.split('/o/')[1];
      
      // Eliminar video de Oracle Storage
      console.log('Deleting video from Oracle Storage...');
      await oracleStorage.deleteFile(decodeURIComponent(videoFileName));

      // Eliminar thumbnail si existe
      if (movie.thumbnailUrl) {
        const thumbnailFileName = movie.thumbnailUrl.split('/o/')[1];
        console.log('Deleting thumbnail from Oracle Storage...');
        await oracleStorage.deleteFile(decodeURIComponent(thumbnailFileName));
      }

      // Eliminar de MongoDB
      await Movie.findByIdAndDelete(req.params.id);

      console.log('Movie deleted successfully');
      
      res.json({ message: 'Película eliminada exitosamente' });
    } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(500).json({ 
        error: 'Error al eliminar la película',
        details: error.message 
      });
    }
  }
};

export default movieController;