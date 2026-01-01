import { z } from "zod";

export const createSaleSchema = z.object({
  body: z.object({
    salesmanId: z.number(),
    carModelId: z.number(),
    quantity: z.number().min(1),
  }),
});
