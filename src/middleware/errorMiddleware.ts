import type { NextFunction, Request, Response } from 'express';
import logger from '../logger/winston.js';
import config from '../config/config.js';

/**
 *@description Error Middleware with the custom error response type such as success,
 * statusCode, message , errors[], stack (Only send the error stack in case of development)
 * for debugging and also store the Error message and Error stack in the logger.
 */

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = (err as any).statusCode || 500;
  const message = err.message || 'Internal server error';
  const success = (err as any).succes || false;

  logger.error(`Error message ${message} Error stack ${err?.stack}`);

  res.status(statusCode).send({
    success: success,
    statusCode: statusCode,
    message: message,
    errors: [],
    stack: config.NODE_ENV === 'development' ? err.stack : undefined
  });
};
