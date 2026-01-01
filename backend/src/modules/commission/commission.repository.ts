import { db } from "../../config/db";
import { SaleRow, Salesman } from "./commission.types";

export const getSalesmen = async (): Promise<Salesman[]> => {
  return db<Salesman>("salesmen").select("*");
};

export const getSalesDataBySalesman = async (
  salesmanId: number
): Promise<SaleRow[]> => {
  return db("sales_transactions as st")
    .join("car_models as cm", "cm.id", "st.car_model_id")
    .where("st.salesman_id", salesmanId)
    .select("cm.brand", "cm.class", "cm.price", "st.quantity");
};

export const getSalesmanById = async (id: number) => {
  return db("salesmen").where({ id }).first();
};
