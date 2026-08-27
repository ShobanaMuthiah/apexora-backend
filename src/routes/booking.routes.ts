import { Router } from "express";
import { bookingController } from "../controllers/booking.controller";
import { authenticate, requireRole } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createBookingSchema } from "../validators";

const r = Router();
r.get("/", authenticate, bookingController.listByUser);
r.get("/all", authenticate, requireRole("admin", "superadmin"), bookingController.listAll);
r.post("/", authenticate, validate(createBookingSchema), bookingController.create);
r.post("/:id/cancel", authenticate, bookingController.cancel);
export default r;
