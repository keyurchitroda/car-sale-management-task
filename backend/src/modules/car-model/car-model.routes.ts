import { Router } from "express";
import { upload } from "../../utils/upload";
import { create, list, getById, update, remove } from "./car-model.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createCarModelSchema } from "./car-model.validation";

const router = Router();

router.post(
  "/",
  upload.array("images", 5),
  validate(createCarModelSchema),
  create
);

router.get("/", list);

router.get("/:id", getById);
router.put("/:id", upload.array("images", 5), update);
router.delete("/:id", remove);

export default router;
