import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok, created } from "../utils/ApiResponse";
import { authService } from "../services/auth.service";
import { ApiError } from "../utils/ApiError";

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.register(req.body);
    created(res, result);
  }),
  login: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    ok(res, result);
  }),
  me: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw ApiError.unauthorized();
    ok(res, await authService.me(req.user.sub));
  }),
  logout: asyncHandler(async (_req, res) => {
    // Stateless JWT — client just drops the token. Endpoint kept for parity.
    ok(res, { success: true });
  }),
};
