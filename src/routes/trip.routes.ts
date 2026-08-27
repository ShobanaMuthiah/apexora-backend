import { Router } from "express";
import { tripController } from "../controllers/trip.controller";
import { authenticate, requireRole } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createTripSchema, updateTripSchema, listTripsQuery } from "../validators";

const r = Router();
r.get("/", validate(listTripsQuery, "query"), tripController.list);
r.get("/:id", tripController.getById);
r.post("/", authenticate, requireRole("admin", "superadmin"), validate(createTripSchema), tripController.create);
r.patch("/:id", authenticate, requireRole("admin", "superadmin"), validate(updateTripSchema), tripController.update);
r.delete("/:id", authenticate, requireRole("admin", "superadmin"), tripController.remove);
export default r;
