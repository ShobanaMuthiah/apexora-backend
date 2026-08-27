import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../validators/auth.validator";

const r = Router();
r.post("/register", validate(registerSchema), authController.register);
r.post("/login", validate(loginSchema), authController.login);
r.post("/logout", authenticate, authController.logout);
r.get("/me", authenticate, authController.me);
export default r;
