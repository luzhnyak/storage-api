import express from "express";
import Product from "../models/Product";
import Brand from "../models/Brand";
import Category from "../models/Category";
import { validate } from "../middleware/validate";
import { productSchema } from "../schemas/productSchema";

const router = express.Router();

router.get("/", async (_, res) => {
  const products = await Product.findAll({ include: ["brand", "category"] });
  res.json(products);
});

router.post("/", validate(productSchema), async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

export default router;
