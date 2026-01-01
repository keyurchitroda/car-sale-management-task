import { Router } from "express";
import {
  getCommissionReport,
  getCommissionReportBySalesman,
} from "./commission.controller";

const router = Router();

router.get("/report", getCommissionReport);
router.get("/report/:salesmanId", getCommissionReportBySalesman);

export default router;
