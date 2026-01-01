import { db } from "../../config/db";

export const createSaleRepo = async (data: {
  salesman_id: number;
  car_model_id: number;
  quantity: number;
}) => {
  const [row] = await db("sales_transactions").insert(data).returning("*");
  return row;
};
