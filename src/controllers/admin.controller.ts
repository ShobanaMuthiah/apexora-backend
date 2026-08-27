import { asyncHandler } from "../utils/asyncHandler";
import { ok, created } from "../utils/ApiResponse";
import { adminService } from "../services/admin.service";

export const adminController = {
  listUsers: asyncHandler(async (_req, res) => {
    ok(res, await adminService.listUsers());
  }),
  listAdmins: asyncHandler(async (_req, res) => {
    ok(res, await adminService.listAdmins());
  }),
  createAdmin: asyncHandler(async (req, res) => {
    created(res, await adminService.createAdmin(req.body));
  }),
};
