export type Brand = "Audi" | "Jaguar" | "Land Rover" | "Renault";
export type CarClass = "A" | "B" | "C";

export interface SaleRow {
  brand: Brand;
  class: CarClass;
  price: number;
  quantity: number;
}

export interface Salesman {
  id: number;
  name: string;
  previous_year_sales: number;
}
