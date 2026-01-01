import { db } from "../../config/db";

export const createCarModel = async (data: any) => {
  const [row] = await db("car_models").insert(data).returning("*");
  return row;
};

export const findAllCarModels = async (search?: string, sortBy?: string) => {
  const query = db("car_models");

  if (search) {
    query.where((builder) =>
      builder
        .whereILike("model_name", `%${search}%`)
        .orWhereILike("model_code", `%${search}%`)
    );
  }

  switch (sortBy) {
    case "date":
      query.orderBy("date_of_manufacturing", "asc");
      break;
    case "sortOrder":
      query.orderBy("sort_order", "asc");
      break;
    case "latest":
      query.orderBy("created_at", "desc");
      break;
    default:
      query.orderBy("created_at", "asc");
  }

  return query;
};

export const findCarModelById = async (id: number) => {
  return db("car_models").where({ id }).first();
};

export const updateCarModel = async (id: number, data: any) => {
  const [row] = await db("car_models")
    .where({ id })
    .update(data)
    .returning("*");
  return row;
};

export const deleteCarModel = async (id: number) => {
  return db("car_models").where({ id }).del();
};
