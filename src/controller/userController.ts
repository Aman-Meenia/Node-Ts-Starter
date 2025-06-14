import { User } from '../model/userModel.js';
import type { userSchemaType } from '../schema/userSchema.js';
import ApiError from '../util/ApiError.js';
import ApiResponse from '../util/ApiResponse.js';
import { asyncHandler } from '../util/asyncHanlder.js';
import type { Request, Response } from 'express';

/**
 * @description
 * Handles the creation of a new user.
 *
 * - Validates if a user with the provided email already exists.
 * - If not, creates a new user with the given name, email, and password.
 * - Returns a success response with the created user data.
 *
 * @route POST /api/users
 * @access Public
 */

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const data: userSchemaType = req.body;

  const checkUser = await User.findOne({
    email: data.email
  });

  if (checkUser) {
    throw new ApiError({
      statusCode: 400,
      message: 'User with this email already present'
    });
  }

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: data.password
  });

  const resData = {
    user
  };

  const apiResponse = new ApiResponse({
    statusCode: 200,
    message: 'User created successfully',
    data: resData
  });

  return apiResponse.sendResponse(res);
});

/**
 * @description
 * Fetches all users from the database.
 *
 * - Retrieves a list of all users.
 * - Returns a success response with the list of users.
 *
 * @route GET /api/users
 * @access Public
 */

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();

  const apiResponse = new ApiResponse({
    statusCode: 200,
    message: 'Users details fetched successfully',
    data: {
      users
    }
  });
  return apiResponse.sendResponse(res);
});
