import { Response } from "express";

/**
 * Success response mapper
 */
export const successResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Error response mapper
 */
export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: any
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString(),
  });
};
