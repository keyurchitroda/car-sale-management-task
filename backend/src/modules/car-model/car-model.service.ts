import * as repo from "./car-model.repository";
import * as mapper from "./car-model.mapper";
import { AppError } from "../../core/app.error";
import fs from "fs";
import path from "path";

export const createCarModel = async (data: any) => {
  try {
    const entity = mapper.toCarModelEntity(data);
    const row = await repo.createCarModel(entity);
    return mapper.toCarModelDTO(row);
  } catch (error: any) {
    if (error.code === "23505") {
      throw new AppError("Car model with this model code already exists", 409);
    }
    throw error;
  }
};

export const getCarModels = async (search?: string, sortBy?: string) => {
  const rows = await repo.findAllCarModels(search, sortBy);
  return rows.map(mapper.toCarModelDTO);
};

export const getCarModelById = async (id: number) => {
  const row = await repo.findCarModelById(id);
  if (!row) throw new AppError("Car model not found", 404);
  return mapper.toCarModelDTO(row);
};

export const updateCarModel = async (id: number, data: any) => {
  const car = await repo.findCarModelById(id);
  if (!car) {
    throw new AppError("Car model not found", 404);
  }

  if (Array.isArray(data.deletedImages)) {
    data.deletedImages.forEach((img: string) => {
      const filePath = path.join("uploads", img);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  }

  const finalImages: string[] = [
    ...(data.existingImages || []),
    ...(data.newImages || []),
  ];

  let defaultImage = data.defaultImage;

  if (!defaultImage || !finalImages.includes(defaultImage)) {
    defaultImage = finalImages[0] || null;
  }

  const entity = {
    ...mapper.toCarModelEntity(data),
    images: finalImages,
    default_image: defaultImage,
  };

  const updated = await repo.updateCarModel(id, entity);

  return mapper.toCarModelDTO(updated);
};

export const deleteCarModel = async (id: number) => {
  const deleted = await repo.deleteCarModel(id);
  if (!deleted) throw new AppError("Car model not found", 404);
};
