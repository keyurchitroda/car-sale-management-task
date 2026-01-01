import { Request, Response, NextFunction } from "express";
import * as service from "./salesman.service";
import { successResponse } from "../../core/response.mapper";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.getSalemanData();
    return successResponse(
      res,
      200,
      "Salesman data fetched successfully",
      result
    );
  } catch (err) {
    next(err);
  }
};
