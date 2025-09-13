import { Request, Response } from "express";

import Product from "../models/Product";
import { HttpError, ctrlWrapper } from "../helpers";

// ============================== Get All

const getAllProducts = async (req: Request, res: Response) => {
  const PER_PAGE = 12;
  // const { page = "1", category_id: categoryId = 0 } = req.query;

  const page = parseInt(req.query.page as string) || 1;
  const categoryId = req.query.categoryId
    ? parseInt(req.query.categoryId as string)
    : null;

  let products;

  if (categoryId) {
    if (page != 0) {
      products = await Product.findAll({
        limit: PER_PAGE,
        offset: (page - 1) * PER_PAGE,
        where: { categoryId: categoryId },
      });
    } else {
      products = await Product.findAll({
        where: { categoryId: categoryId },
      });
    }
  } else {
    products = await Product.findAll({
      limit: PER_PAGE,
      offset: (page - 1) * PER_PAGE,
    });
  }

  res.json(products);
};

// ============================== Get by ID

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);

  if (!product) {
    throw new HttpError(404, "Not found");
  }

  res.json(product);
};

// ============================== Add

const addProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);

  res.status(201).json(product);
};

// ============================== Delete

const removeProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleted = await Product.destroy({ where: { id } });
  if (deleted === 0) {
    throw new HttpError(404, "Not found");
  }

  res.json({ message: "Product deleted" });
};

// ============================== Update

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const [updated] = await Product.update(req.body, { where: { id } });
  if (updated === 0) {
    throw new HttpError(404, "Not found");
  }

  const product = await Product.findByPk(id);

  res.json(product);
};

export default {
  getAllProducts: ctrlWrapper(getAllProducts),
  getProductById: ctrlWrapper(getProductById),
  addProduct: ctrlWrapper(addProduct),
  removeProduct: ctrlWrapper(removeProduct),
  updateProduct: ctrlWrapper(updateProduct),
};
