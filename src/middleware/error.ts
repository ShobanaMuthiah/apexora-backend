import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      details: err.flatten(),
    });
  }
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      details: err.details,
    });
  }
  console.error(err);
  return res.status(500).json({
    success: false,
    message: err?.message ?? "Internal server error",
  });
};

export const notFound: import("express").RequestHandler = (_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
};
