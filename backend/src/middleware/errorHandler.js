import logger from '../../config/logger.js';

// Middleware para manejar errores
export const errorHandler = (err, req, res, next) => {
  // Log del error
  logger.error('Error capturado', {
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userId: req.user?.userId,
    body: req.body,
  });

  // Determinar código de status
  const statusCode = err.statusCode || 500;

  // Respuesta al cliente
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Middleware para rutas no encontradas (404)
export const notFoundHandler = (req, res, next) => {
  logger.warn(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, {
    ip: req.ip,
  });

  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
};