import { Request, Response, NextFunction } from "express";
import * as service from "./car-model.service";
import { successResponse } from "../../core/response.mapper";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];
    const imageFileNames = files?.map((file) => file.filename) || [];

    const payload = {
      ...req.body,
      images: imageFileNames,
    };

    const result = await service.createCarModel(payload);
    return successResponse(res, 201, "Car model created successfully", result);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, sortBy } = req.query;
    const result = await service.getCarModels(
      search as string,
      sortBy as string
    );
    return successResponse(res, 200, "Car models fetched", result);
  } catch (err) {
    next(err);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await service.getCarModelById(Number(req.params.id));
    return successResponse(res, 200, "Car model fetched", result);
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];

    const newImageNames = files?.map((file) => file.filename) || [];

    const payload = {
      ...req.body,
      newImages: newImageNames,
      existingImages: JSON.parse(req.body.existingImages || "[]"),
      deletedImages: JSON.parse(req.body.deletedImages || "[]"),
      defaultImage: req.body.defaultImage,
    };

    const result = await service.updateCarModel(Number(req.params.id), payload);

    return successResponse(res, 200, "Car updated successfully", result);
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.deleteCarModel(Number(req.params.id));
    return successResponse(res, 200, "Car model deleted", null);
  } catch (err) {
    next(err);
  }
};
