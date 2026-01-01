import express from "express";
import healthRoutes from "../modules/health/health.routes";
import carModelRoutes from "../modules/car-model/car-model.routes";
import commissionRoutes from "../modules/commission/commission.routes";
import salesRoutes from "../modules/sales/sales.routes";
import salesmanRoutes from "../modules/salesman/salesman.routes";

const app = express();

app.use("/health", healthRoutes);
app.use("/car-models", carModelRoutes);
app.use("/commission", commissionRoutes);
app.use("/sales", salesRoutes);
app.use("/salesman", salesmanRoutes);

export default app;
