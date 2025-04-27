import type { Request, Response, NextFunction } from 'express';

/**
 * @description
 * The `asyncHandler` is a utility function designed to simplify handling asynchronous code in API controllers.
 * Instead of wrapping every controller action in a `try-catch` block, you can use this handler to automatically catch
 * errors and pass them to the Express error handling middleware. This helps in keeping the code clean and prevents
 * repetitive error handling logic.
 *
 * The `asyncHandler` ensures that any unhandled promise rejection within an async route handler is properly passed to
 * the next error handling middleware, where it can be dealt with accordingly.
 *
 * @param asyncHandler The asynchronous controller function that returns a Promise.
 *                                    This function should contain the core logic of your route handler.
 * @returns  A wrapped version of the provided `requestHandler` that automatically catches errors
 *                       and passes them to the next middleware.
 *
 */

export const asyncHandler = (
  requestHandler: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};
