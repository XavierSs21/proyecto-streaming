import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Niveles de log
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
  )
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.json()
);

// Transport para errores (rotación diaria)
const errorTransport = new DailyRotateFile({
  filename: path.join(__dirname, '../logs/error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxSize: '20m',
  maxFiles: '14d',
  format: fileFormat,
});

// Transport para todos los logs
const combinedTransport = new DailyRotateFile({
  filename: path.join(__dirname, '../logs/combined-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
  format: fileFormat,
});

// Transport para HTTP requests
const httpTransport = new DailyRotateFile({
  filename: path.join(__dirname, '../logs/http-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  level: 'http',
  maxSize: '20m',
  maxFiles: '7d',
  format: fileFormat,
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  transports: [
    errorTransport,
    combinedTransport,
    httpTransport,
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
    })
  );
}

// Helper para log de requests
export const logRequest = (req, message, level = 'info') => {
  logger.log(level, message, {
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userId: req.user?.userId,
  });
};

// Helper para log de errores
export const logError = (error, context = {}) => {
  logger.error(error.message, {
    stack: error.stack,
    ...context,
  });
};

export default logger;