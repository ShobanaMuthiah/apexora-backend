import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok, created, noContent } from "../utils/ApiResponse";
import { tripService } from "../services/trip.service";
import { ApiError } from "../utils/ApiError";

export const tripController = {
  list: asyncHandler(async (req, res) => {
    ok(res, await tripService.list(req.query as any));
  }),
  getById: asyncHandler(async (req, res) => {
    ok(res, await tripService.getById(req.params.id));
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw ApiError.unauthorized();
    created(res, await tripService.create(req.user.sub, req.body));
  }),
  update: asyncHandler(async (req, res) => {
    if (!req.user) throw ApiError.unauthorized();
    ok(res, await tripService.update(req.params.id, { id: req.user.sub, role: req.user.role }, req.body));
  }),
  remove: asyncHandler(async (req, res) => {
    if (!req.user) throw ApiError.unauthorized();
    await tripService.remove(req.params.id, { id: req.user.sub, role: req.user.role });
    noContent(res);
  }),
};
