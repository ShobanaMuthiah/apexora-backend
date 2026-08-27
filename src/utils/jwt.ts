import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { JwtPayload } from "../types";

export const signJwt = (payload: JwtPayload): string =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

export const verifyJwt = (token: string): JwtPayload =>
  jwt.verify(token, env.jwtSecret) as JwtPayload;
