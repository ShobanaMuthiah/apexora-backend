import { asyncHandler } from "../utils/asyncHandler";
import { ok, created } from "../utils/ApiResponse";
import { planService } from "../services/plan.service";
import { ApiError } from "../utils/ApiError";

export const planController = {
  listByUser: asyncHandler(async (req, res) => {
    if (!req.user) throw ApiError.unauthorized();
    const userId = (req.query.userId as string) || req.user.sub;
    if (req.user.role === "user" && userId !== req.user.sub) throw ApiError.forbidden();
    ok(res, await planService.listByUser(userId));
  }),
  create: asyncHandler(async (req, res) => {
    if (!req.user) throw ApiError.unauthorized();
    created(res, await planService.create(req.user.sub, req.body));
  }),
};
