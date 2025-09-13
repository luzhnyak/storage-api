import express from "express";
import Category from "../models/Category";
import { validate } from "../middleware/validate";
import { categorySchema } from "../schemas/categorySchema";

const router = express.Router();

router.get("/", async (_, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

router.post("/", validate(categorySchema), async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

export default router;
