type apiErrorType = {
  statusCode: number;
  message: string;
  errors?: any[];
};

/**
 * @description This class extends the default JavaScript Error class by adding
 * properties like 'statusCode', 'errors' and 'success'.
 * It is used to throw consistent, structured errors throughout the application.
 *
 * @param {Object} params - The error parameters.
 * @param {number} params.statusCode - HTTP status code associated with the error.
 * @param {string} params.message - A descriptive error message.
 * @param {any[]} [params.errors=[]] - Additional error details or validation errors.
 *
 */

export default class ApiError extends Error {
  statusCode: number;
  success: boolean;
  errors?: any[];

  constructor({ statusCode, message, errors = [] }: apiErrorType) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}
