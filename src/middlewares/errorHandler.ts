import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error:", err);
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ message });
}
