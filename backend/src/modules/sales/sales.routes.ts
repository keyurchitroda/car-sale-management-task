import { Router } from "express";
import { createSale } from "./sales.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createSaleSchema } from "./sales.validation";

const router = Router();

router.post("/create", validate(createSaleSchema), createSale);

export default router;
