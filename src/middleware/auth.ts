import type { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";
import type { UserRole } from "../types";

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) throw ApiError.unauthorized("Missing bearer token");
  try {
    req.user = verifyJwt(header.slice(7));
    next();
  } catch {
    throw ApiError.unauthorized("Invalid or expired token");
  }
};

export const requireRole =
  (...roles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) throw ApiError.unauthorized();
    if (!roles.includes(req.user.role)) throw ApiError.forbidden("Insufficient role");
    next();
  };
