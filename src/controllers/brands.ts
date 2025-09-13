import { Request, Response } from "express";

import Brand from "../models/Brand";
import { HttpError, ctrlWrapper } from "../helpers";

// ============================== Get All

const getAllBrands = async (req: Request, res: Response) => {
  const brand = await Brand.findAll();

  if (!brand) {
    throw new HttpError(404, "Not found");
  }

  res.json(brand);
};

// ============================== Get by ID

const getBrandById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const brand = await Brand.findByPk(id);

  if (!brand) {
    throw new HttpError(404, "Not found");
  }

  res.json(brand);
};

// ============================== Add

const addBrand = async (req: Request, res: Response) => {
  const brand = await Brand.create(req.body);

  res.status(201).json(brand);
};

// ============================== Delete

const removeBrand = async (req: Request, res: Response) => {
  const { id } = req.params;

  let result = 0;

  if (id) {
    result = await Brand.destroy({
      where: {
        id,
      },
    });
  }

  if (result <= 0) {
    throw new HttpError(404, "Not found");
  }

  res.json({ message: "Brand deleted" });
};

// ============================== Update

const updateBrand = async (req: Request, res: Response) => {
  const { id } = req.params;

  let result;

  if (id) {
    result = await Brand.update(req.body, {
      where: {
        id: id,
      },
    });
  }

  if (result && result[0] <= 0) {
    throw new HttpError(404, "Not found");
  }

  const brand = await Brand.findByPk(id);

  res.json(brand);
};

export default {
  getAllBrands: ctrlWrapper(getAllBrands),
  getBrandById: ctrlWrapper(getBrandById),
  addBrand: ctrlWrapper(addBrand),
  removeBrand: ctrlWrapper(removeBrand),
  updateBrand: ctrlWrapper(updateBrand),
};
