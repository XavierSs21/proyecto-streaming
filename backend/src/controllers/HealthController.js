import mongoose from 'mongoose';
import logger from '../../config/logger.js';
import { HeadBucketCommand } from '@aws-sdk/client-s3';
import s3 from '../services/s3.js';

export const healthCheck = async (req, res) => {
  try {
    const healthStatus = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {}
    };

    // Verificar MongoDB
    try {
      const mongoState = mongoose.connection.readyState;
      const mongoStates = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
      };

      healthStatus.services.mongodb = {
        status: mongoState === 1 ? 'healthy' : 'unhealthy',
        state: mongoStates[mongoState],
        database: mongoose.connection.db?.databaseName || 'unknown'
      };

      if (mongoState !== 1) {
        healthStatus.status = 'DEGRADED';
        logger.warn('MongoDB no está conectado en health check', {
          requestId: req.requestId,
          mongoState: mongoStates[mongoState]
        });
      }
    } catch (error) {
      healthStatus.services.mongodb = {
        status: 'unhealthy',
        error: error.message
      };
      healthStatus.status = 'DEGRADED';
      
      logger.error('Error al verificar MongoDB en health check', {
        requestId: req.requestId,
        error: error.message
      });
    }

    // Verificar AWS S3
    try {
      const hasS3Config = !!(
        process.env.AWS_REGION &&
        process.env.AWS_ACCESS_KEY_ID &&
        process.env.AWS_SECRET_ACCESS_KEY &&
        process.env.AWS_BUCKET_NAME
      );

      if (hasS3Config) {
        // Intentar hacer una operación simple en el bucket
        const command = new HeadBucketCommand({
          Bucket: process.env.AWS_BUCKET_NAME
        });
        
        await s3.send(command);
        
        healthStatus.services.s3 = {
          status: 'healthy',
          bucket: process.env.AWS_BUCKET_NAME,
          region: process.env.AWS_REGION
        };
      } else {
        healthStatus.services.s3 = {
          status: 'not_configured'
        };
      }
    } catch (error) {
      healthStatus.services.s3 = {
        status: 'unhealthy',
        error: error.message
      };
      healthStatus.status = 'DEGRADED';
      
      logger.error('Error al verificar S3 en health check', {
        requestId: req.requestId,
        error: error.message
      });
    }

    // Log del health check
    logger.info('Health check completado', {
      requestId: req.requestId,
      status: healthStatus.status,
      services: Object.keys(healthStatus.services).map(service => ({
        name: service,
        status: healthStatus.services[service].status
      }))
    });

    // Determinar código HTTP
    const statusCode = healthStatus.status === 'OK' ? 200 : 503;
    
    res.status(statusCode).json(healthStatus);
  } catch (error) {
    logger.error('Error en health check', {
      requestId: req.requestId,
      error: error.message,
      stack: error.stack
    });

    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
};