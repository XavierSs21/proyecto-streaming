import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../services/s3.js";
import logger from "../../config/logger.js";

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const folder = file.mimetype.startsWith("video")
        ? "videos"
        : "thumbnails";

      const key = `${folder}/${Date.now()}-${file.originalname}`;
      
      logger.info('S3: Iniciando subida de archivo', {
        requestId: req.requestId,
        fileName: file.originalname,
        fileType: file.mimetype,
        folder: folder,
        bucket: process.env.AWS_BUCKET_NAME,
      });

      cb(null, key);
    }
  }),
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB max
  },
  fileFilter: (req, file, cb) => {
    // Validar tipos de archivo
    const allowedVideoTypes = ['video/mp4', 'video/mpeg', 'video/quicktime'];
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (file.fieldname === 'video' && !allowedVideoTypes.includes(file.mimetype)) {
      logger.warn('S3: Tipo de video no permitido', {
        requestId: req.requestId,
        fileName: file.originalname,
        fileType: file.mimetype,
      });
      return cb(new Error('Tipo de video no permitido. Solo MP4, MPEG, MOV'));
    }
    
    if (file.fieldname === 'thumbnail' && !allowedImageTypes.includes(file.mimetype)) {
      logger.warn('S3: Tipo de imagen no permitido', {
        requestId: req.requestId,
        fileName: file.originalname,
        fileType: file.mimetype,
      });
      return cb(new Error('Tipo de imagen no permitido. Solo JPEG, PNG, WEBP'));
    }
    
    cb(null, true);
  }
});

// Middleware para manejar errores de multer/S3
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    logger.error('S3: Error de Multer', {
      requestId: req.requestId,
      error: err.message,
      code: err.code,
      field: err.field,
      userId: req.user?._id,
    });
    
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        message: 'Archivo demasiado grande. Máximo 500MB' 
      });
    }
    
    return res.status(400).json({ 
      message: `Error al subir archivo: ${err.message}` 
    });
  }
  
  if (err) {
    logger.error('S3: Error al subir archivo', {
      requestId: req.requestId,
      error: err.message,
      stack: err.stack,
      userId: req.user?._id,
    });
    
    return res.status(500).json({ 
      message: 'Error al subir archivo a S3' 
    });
  }
  
  next();
};

export default upload;