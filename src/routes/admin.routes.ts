import { Router } from "express";
import { adminController } from "../controllers/admin.controller";
import { authenticate, requireRole } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createAdminSchema } from "../validators";

export const adminRouter = Router();
adminRouter.use(authenticate, requireRole("admin", "superadmin"));
adminRouter.get("/users", adminController.listUsers);

export const superadminRouter = Router();
superadminRouter.use(authenticate, requireRole("superadmin"));
superadminRouter.get("/admins", adminController.listAdmins);
superadminRouter.post("/admins", validate(createAdminSchema), adminController.createAdmin);
