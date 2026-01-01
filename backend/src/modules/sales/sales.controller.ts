import { Request, Response, NextFunction } from "express";
import * as service from "./sales.service";
import { successResponse } from "../../core/response.mapper";

export const createSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sale = await service.createSaleTransaction(req.body);

    return successResponse(res, 201, "Sale recorded successfully", sale);
  } catch (err) {
    next(err);
  }
};
