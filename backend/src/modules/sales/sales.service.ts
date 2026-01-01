import { createSaleRepo } from "./sales.repository";

export const createSaleTransaction = async (payload: any) => {
  return createSaleRepo({
    salesman_id: payload.salesmanId,
    car_model_id: payload.carModelId,
    quantity: payload.quantity,
  });
};
