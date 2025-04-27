import type { Response } from 'express';

/**
 * @description A utility class to ensure consistent response structure across the API, including status code,
 * success indicator, message, and optional data payload. It provides a method to send
 * the formatted response to the client using the Express Response object.
 */

export default class ApiResponse {
  statusCode: number;
  message: string;
  data: Record<string, unknown> | null;
  success: boolean;

  constructor({
    statusCode,
    message = '',
    data = null
  }: {
    statusCode: number;
    message: string;
    data?: Record<string, unknown> | null;
  }) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }

  /**
   * @description Sends the standardized response to the client using the Express Response.
   * The response is formatted as JSON with statusCode, success, message, and data properties.
   *
   * @param  res - The Express Response object used to send the response.
   * @returns  The Express Response object with the JSON response sent.
   */
  sendResponse(res: Response) {
    return res.status(this.statusCode).json({
      statusCode: this.statusCode,
      success: this.success,
      message: this.message,
      data: this.data
    });
  }
}
