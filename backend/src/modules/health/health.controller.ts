import { Request, Response, NextFunction } from "express";
import { getHealthStatus } from "./health.service";

export const healthCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getHealthStatus();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
