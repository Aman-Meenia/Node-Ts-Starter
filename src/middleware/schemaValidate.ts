import type { Request, Response, NextFunction } from 'express';
import { fromZodError } from 'zod-validation-error';
import ApiError from '../util/ApiError.js';
import { ZodSchema } from 'zod';

export const schemaValidate =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const zodValidation = schema.safeParse(req.body);

    if (!zodValidation.success) {
      throw new ApiError({
        statusCode: 400,
        message: fromZodError(zodValidation.error).message
      });
    }

    return next();
  };
