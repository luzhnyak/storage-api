import { Request, Response } from "express";

import { HttpError, ctrlWrapper } from "../helpers";

import { UserService } from "../services/userService";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();

  res.json({ items: users });
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new HttpError(400, "Missing id");
  }

  const user = await UserService.getUserById(+id);

  res.json({ user: user });
};

const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  if (!email) {
    throw new HttpError(400, "Missing email");
  }

  const user = await UserService.getUserByEmail(email);

  res.json({ user: user });
};

const createUser = async (req: Request, res: Response) => {
  const userObj = req.body;

  console.log("controller userObj:");

  const user = await UserService.createUser(userObj);

  res.json({ user: user });
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userObj = req.body;

  if (!id) {
    throw new HttpError(400, "Missing id");
  }

  const user = await UserService.updateUser(+id, userObj);

  res.json({ user: user });
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new HttpError(400, "Missing id");
  }

  const user = await UserService.deleteUser(+id);

  res.json({ user: user });
};

export default {
  getAllUsers: ctrlWrapper(getAllUsers),
  getUserById: ctrlWrapper(getUserById),
  getUserByEmail: ctrlWrapper(getUserByEmail),
  createUser: ctrlWrapper(createUser),
  updateUser: ctrlWrapper(updateUser),
  deleteUser: ctrlWrapper(deleteUser),
};
