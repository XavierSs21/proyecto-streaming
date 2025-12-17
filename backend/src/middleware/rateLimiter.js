import rateLimit from 'express-rate-limit';
import logger from '../../config/logger.js';

// Rate limiter general para toda la API
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por ventana
  message: 'Demasiadas peticiones desde esta IP, intenta de nuevo en 15 minutos',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn('Rate limit excedido - General', {
      requestId: req.requestId,
      ip: req.ip,
      url: req.originalUrl,
      userAgent: req.get('user-agent'),
    }); 
    res.status(429).json({
      success: false,
      message: 'Demasiadas peticiones desde esta IP, intenta de nuevo en 15 minutos'
    });
  },
});

// Rate limiter estricto para autenticación
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Solo 5 intentos de login por ventana
  message: 'Demasiados intentos de inicio de sesión, intenta de nuevo en 15 minutos',
  skipSuccessfulRequests: true, // No cuenta requests exitosos
  handler: (req, res) => {
    logger.warn('Rate limit excedido - Autenticación', {
      requestId: req.requestId,
      ip: req.ip,
      url: req.originalUrl,
      correo: req.body.correo || 'no proporcionado',
      userAgent: req.get('user-agent'),
    });
    res.status(429).json({
      success: false,
      message: 'Demasiados intentos de inicio de sesión, intenta de nuevo en 15 minutos'
    });
  },
});

// Rate limiter para crear películas (evitar spam)
export const createMovieLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // Máximo 10 películas por hora
  message: 'Límite de creación de películas alcanzado, intenta de nuevo en 1 hora',
  handler: (req, res) => {
    logger.warn('Rate limit excedido - Crear película', {
      requestId: req.requestId,
      ip: req.ip,
      userId: req.user?._id,
      userEmail: req.user?.correo,
    });
    res.status(429).json({
      success: false,
      message: 'Límite de creación de películas alcanzado, intenta de nuevo en 1 hora'
    });
  },
});

// Rate limiter para recuperación de contraseña
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3, // Solo 3 intentos por hora
  message: 'Demasiados intentos de recuperación de contraseña, intenta de nuevo en 1 hora',
  handler: (req, res) => {
    logger.warn('Rate limit excedido - Recuperación de contraseña', {
      requestId: req.requestId,
      ip: req.ip,
      correo: req.body.correo || 'no proporcionado',
    });
    res.status(429).json({
      success: false,
      message: 'Demasiados intentos de recuperación de contraseña, intenta de nuevo en 1 hora'
    });
  },
});