import { Router } from "express";
import { planController } from "../controllers/plan.controller";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createPlanSchema } from "../validators";

const r = Router();
r.get("/", authenticate, planController.listByUser);
r.post("/", authenticate, validate(createPlanSchema), planController.create);
export default r;
