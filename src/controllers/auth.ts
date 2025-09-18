import { Request, Response } from "express";

import { HttpError, ctrlWrapper } from "../helpers";

import { AuthService } from "../services/authService";
import { AuthenticatedRequest } from "../middlewares/authenticate";

const register = async (req: Request, res: Response) => {
  const body = req.body;

  const data = await AuthService.register(body);

  res.json(data);
};

const login = async (req: Request, res: Response) => {
  const body = req.body;

  const data = await AuthService.login(body);

  res.json(data);
};

const logout = async (req: Request, res: Response) => {
  res.json({ data: "loout" });
};

const refreshUser = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;

  const data = await AuthService.refresh(user);

  res.json(data);
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  refreshUser: ctrlWrapper(refreshUser),
};
