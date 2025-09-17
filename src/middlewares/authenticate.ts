import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../helpers";
import { UserService } from "../services/userService";

export interface AuthenticatedRequest extends Request {
  user?: { id: number; name: string; email: string };
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new HttpError(401, "Authorization header missing"));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(new HttpError(401, "Invalid token format"));
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      id: number;
    };

    const user = await UserService.getUserById(id);
    if (!user) {
      return next(new HttpError(401, "User not found"));
    }

    req.user = { id: user.id!, name: user.name, email: user.email };

    next();
  } catch (error) {
    next(new HttpError(401, "User not authorized"));
  }
};
