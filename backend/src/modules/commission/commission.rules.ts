import { Brand, CarClass } from "./commission.types";

type CommissionRule = {
  fixed: {
    minPrice: number;
    amount: number;
  };
  percentage: Record<CarClass, number>;
};

export const COMMISSION_RULES: Record<Brand, CommissionRule> = {
  Audi: {
    fixed: { minPrice: 25000, amount: 800 },
    percentage: { A: 8, B: 6, C: 4 },
  },
  Jaguar: {
    fixed: { minPrice: 35000, amount: 750 },
    percentage: { A: 6, B: 5, C: 3 },
  },
  "Land Rover": {
    fixed: { minPrice: 30000, amount: 850 },
    percentage: { A: 7, B: 5, C: 4 },
  },
  Renault: {
    fixed: { minPrice: 20000, amount: 400 },
    percentage: { A: 5, B: 3, C: 2 },
  },
};
