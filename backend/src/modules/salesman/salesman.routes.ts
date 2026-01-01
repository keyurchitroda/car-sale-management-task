import { Router } from "express";
import { list } from "./salesman.controller";

const router = Router();

router.get("/get", list);

export default router;
