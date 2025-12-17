import morgan from 'morgan';
import logger from '../../config/logger.js';

// Conectar con morgan
const stream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

const format = ':method :url :status :res[content-length] - :response-time ms';

// Middleware de Morgan
const morganMiddleware = morgan(
  format,
  { 
    stream,
    skip: (req, res) => {
      if (process.env.NODE_ENV === 'production') {
        return res.statusCode < 400;
      }
      return false;
    }
  }
);

export default morganMiddleware;