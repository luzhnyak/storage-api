import { Request, Response } from "express";

import { HttpError, ctrlWrapper } from "../helpers";

import { UserService } from "../services/userService";
import { AuthenticatedRequest } from "../types/types";
import { AuthService } from "../services/authService";

// ============================== Get All

const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();

  res.json({ items: users });
};

// ============================== Get by ID

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new HttpError(400, "Missing id");
  }

  const user = await UserService.getUserById(+id);

  res.json({ user: user });
};

// ============================== Register

const register = async (req: Request, res: Response) => {
  const body = req.body;

  const data = await AuthService.register(body);

  res.json(data);
};

// ============================== Login

const login = async (req: Request, res: Response) => {
  const body = req.body;

  const data = await AuthService.login(body);

  res.json(data);
};

// ============================== Logout

const logout = async (req: Request, res: Response) => {
  await AuthService.logout();

  res.json({ data: "loout" });
};

// ============================== Refresh user

const refreshUser = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;

  const data = await AuthService.refresh(user);

  res.json(data);
};

export default {
  getAllUsers: ctrlWrapper(getAllUsers),
  getUserById: ctrlWrapper(getUserById),
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  refreshUser: ctrlWrapper(refreshUser),
};
