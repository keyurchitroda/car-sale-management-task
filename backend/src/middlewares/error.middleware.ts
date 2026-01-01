import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../core/response.mapper";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return errorResponse(res, statusCode, message, err.errors);
};
