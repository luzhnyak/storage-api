import { Request, Response } from "express";

import Category from "../models/Category";
import { HttpError, ctrlWrapper } from "../helpers";

// ============================== Get All

const getAllCategories = async (req: Request, res: Response) => {
  const category = await Category.findAll();

  if (!category) {
    throw new HttpError(404, "Not found");
  }

  res.json(category);
};

// ============================== Get by ID

const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await Category.findByPk(id);

  if (!category) {
    throw new HttpError(404, "Not found");
  }

  res.json(category);
};

// ============================== Add

const addCategory = async (req: Request, res: Response) => {
  const category = await Category.create(req.body);

  res.status(201).json(category);
};

// ============================== Delete

const removeCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  let result = 0;

  if (id) {
    result = await Category.destroy({
      where: {
        id,
      },
    });
  }

  if (result <= 0) {
    throw new HttpError(404, "Not found");
  }

  res.json({ message: "Category deleted" });
};

// ============================== Update

const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  let result;

  if (id) {
    result = await Category.update(req.body, {
      where: {
        id: id,
      },
    });
  }

  if (result && result[0] <= 0) {
    throw new HttpError(404, "Not found");
  }

  const category = await Category.findByPk(id);

  res.json(category);
};

export default {
  getAllCategories: ctrlWrapper(getAllCategories),
  getCategoryById: ctrlWrapper(getCategoryById),
  addCategory: ctrlWrapper(addCategory),
  removeCategory: ctrlWrapper(removeCategory),
  updateCategory: ctrlWrapper(updateCategory),
};
