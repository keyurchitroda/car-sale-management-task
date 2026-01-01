import { db } from "../../config/db";
import { Salesman } from "../commission/commission.types";

export const getSalesmen = async (): Promise<Salesman[]> => {
  return db<Salesman>("salesmen").select("*");
};
