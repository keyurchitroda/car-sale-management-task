import { z } from "zod";

export const createCarModelSchema = z.object({
  body: z.object({
    brand: z.enum(["Audi", "Jaguar", "Land Rover", "Renault"]),
    class: z.enum(["A", "B", "C"]),

    modelName: z.string().min(1),
    modelCode: z
      .string()
      .length(10)
      .regex(/^[a-zA-Z0-9]+$/),

    description: z.string().min(1),
    features: z.string().min(1),

    price: z.coerce.number().positive(),

    dateOfManufacturing: z.string(),

    active: z.coerce.boolean().optional(),
    sortOrder: z.coerce.number().optional(),
  }),
});
