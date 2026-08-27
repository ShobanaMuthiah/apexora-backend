import { Router } from "express";
import authRoutes from "./auth.routes";
import tripRoutes from "./trip.routes";
import bookingRoutes from "./booking.routes";
import planRoutes from "./plan.routes";
import { adminRouter, superadminRouter } from "./admin.routes";

const router = Router();

router.get("/health", (_req, res) => res.json({ success: true, data: { status: "ok" } }));

router.use("/auth", authRoutes);
router.use("/trips", tripRoutes);
router.use("/bookings", bookingRoutes);
router.use("/plans", planRoutes);
router.use("/admin", adminRouter);
router.use("/superadmin", superadminRouter);

export default router;
