import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "../config/database.js";
import UserRoute from "../src/routes/UserRoute.js"
import MovieRoute from "./routes/movieRoutes.js"
import ListRoute from "./routes/myListRoute.js"

import logger from "../config/logger.js";
import morganMiddleware from "./middleware/morganMiddleware.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

import { requestIdMiddleware } from "./middleware/requestIdMiddleware.js";
import { generalLimiter } from "./middleware/rateLimiter.js";
import { performanceMonitor } from "./middleware/performanceMonitor.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(requestIdMiddleware);
app.use(performanceMonitor);
app.use(morganMiddleware);
app.use(generalLimiter);

connectDB();

logger.info('Iniciando servidor indieStream...', {
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
});

app.get("/test", (req, res)=> {
    res.json({message: "Hola!"});
})

app.use("/user", UserRoute);
app.use("/movies", MovieRoute)
app.use("/list", ListRoute);

app.get("/health", (req, res) => {
  logger.info('Health check solicitado');
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;  

app.listen(PORT, () => {
  logger.info(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', { reason });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', {
    message: error.message,
    stack: error.stack,
  });
  process.exit(1);
});
