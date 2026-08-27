import { asyncHandler } from "../utils/asyncHandler";
import { ok, created } from "../utils/ApiResponse";
import { bookingService } from "../services/booking.service";
import { ApiError } from "../utils/ApiError";

export const bookingController = {
  listByUser: asyncHandler(async (req, res) => {
    if (!req.user) throw ApiError.unauthorized();
    const userId = (req.query.userId as string) || req.user.sub;
    if (req.user.role === "user" && userId !== req.user.sub) throw ApiError.forbidden();
    ok(res, await bookingService.listByUser(userId));
  }),
  listAll: asyncHandler(async (_req, res) => {
    ok(res, await bookingService.listAll());
  }),
  create: asyncHandler(async (req, res) => {
    if (!req.user) throw ApiError.unauthorized();
    created(res, await bookingService.create(req.user.sub, req.body));
  }),
  cancel: asyncHandler(async (req, res) => {
    if (!req.user) throw ApiError.unauthorized();
    ok(res, await bookingService.cancel(req.params.id, { id: req.user.sub, role: req.user.role }));
  }),
};
