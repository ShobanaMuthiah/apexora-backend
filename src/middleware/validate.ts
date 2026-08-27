import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";

type Source = "body" | "query" | "params";

export const validate =
  (schema: ZodTypeAny, source: Source = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.parse(req[source]);
    (req as any)[source] = parsed;
    next();
  };
