import { Request, Response, NextFunction } from "express";
import {
  generateCommissionReport,
  generateSingleSalesmanReport,
} from "./commission.service";
import { successResponse } from "../../core/response.mapper";

export const getCommissionReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const report = await generateCommissionReport();
    return successResponse(
      res,
      200,
      "Commission report generated successfully",
      report
    );
  } catch (err) {
    next(err);
  }
};

export const getCommissionReportBySalesman = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salesmanId = Number(req.params.salesmanId);
    const report = await generateSingleSalesmanReport(salesmanId);

    return successResponse(
      res,
      200,
      "Salesman commission report generated successfully",
      report
    );
  } catch (err) {
    next(err);
  }
};
