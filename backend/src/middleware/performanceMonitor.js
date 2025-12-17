import logger from '../../config/logger.js';

export const performanceMonitor = (req, res, next) => {
  const startTime = Date.now();

  // Capturar cuando la respuesta termina
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const level = duration > 2000 ? 'warn' : duration > 1000 ? 'info' : 'debug';

    // Log de rendimiento
    logger.log(level, 'Request completado', {
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userId: req.user?._id,
      timestamp: new Date().toISOString(),
    });

    // Alerta si es muy lento
    if (duration > 2000) {
      logger.warn('Operación lenta detectada', {
        requestId: req.requestId,
        method: req.method,
        url: req.originalUrl,
        duration: `${duration}ms`,
        threshold: '2000ms',
      });
    }
  });

  next();
};