import mongoose from "mongoose";
import logger from "./logger.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    
    logger.info('MongoDB conectado exitosamente', {
      host: conn.connection.host,
      database: conn.connection.db.databaseName,
      port: conn.connection.port,
    });

    // Eventos de conexión
    mongoose.connection.on('connected', () => {
      logger.info('MongoDB: Conexión establecida', {
        host: mongoose.connection.host,
        database: mongoose.connection.db?.databaseName,
      });
    });

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB: Error de conexión', {
        error: err.message,
        stack: err.stack,
      });
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB: Desconectado', {
        host: mongoose.connection.host,
      });
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB: Reconectado', {
        host: mongoose.connection.host,
      });
    });

  } catch (error) {
    logger.error('MongoDB: Error fatal al conectar', {
      error: error.message,
      stack: error.stack,
      uri: process.env.MONGODB_CONNECTION_STRING ? 'configurado' : 'no configurado',
    });
    process.exit(1);
  }
};

export default connectDB;